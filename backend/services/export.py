import os
import io
import zipfile
import json
from database.models import SessionLocal, FactTravelTicket
from sqlalchemy import func

def generate_csuite_briefing_html():
    """
    Generates a printable HTML executive travel briefing report formatted for C-Suite meetings.
    """
    session = SessionLocal()
    
    total_tickets = session.query(func.count(FactTravelTicket.ticket_id)).scalar() or 0
    total_spend_inr = session.query(func.sum(FactTravelTicket.amount_inr)).filter(FactTravelTicket.travelled_flag == 'Y').scalar() or 0.0
    cross_border_count = session.query(func.count(FactTravelTicket.ticket_id)).filter(FactTravelTicket.trip_classification == 'Cross-Border').scalar() or 0
    domestic_count = session.query(func.count(FactTravelTicket.ticket_id)).filter(FactTravelTicket.trip_classification == 'Domestic').scalar() or 0
    cancelled_count = session.query(func.count(FactTravelTicket.ticket_id)).filter(FactTravelTicket.travelled_flag == 'N').scalar() or 0

    bu_query = session.query(
        FactTravelTicket.business_unit,
        func.count(FactTravelTicket.ticket_id),
        func.sum(FactTravelTicket.amount_inr)
    ).filter(FactTravelTicket.travelled_flag == 'Y').group_by(FactTravelTicket.business_unit).all()

    session.close()

    bu_rows = ""
    for bu, count, amt in bu_query:
        bu_rows += f"""
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 500;">{bu}</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: center;">{count}</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right; font-family: monospace;">₹{amt:,.2f}</td>
        </tr>
        """

    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Corporate Travel Analytics - C-Suite Executive Travel Briefing</title>
        <style>
            body {{ font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; background: #ffffff; padding: 40px; margin: 0; }}
            .header {{ display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #2563eb; padding-bottom: 20px; }}
            .logo {{ font-size: 24px; font-weight: 800; color: #1e3a8a; letter-spacing: -0.5px; }}
            .badge {{ background: #dbeafe; color: #1e40af; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 9999px; }}
            .kpi-grid {{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 30px 0; }}
            .kpi-card {{ background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; text-align: center; }}
            .kpi-num {{ font-size: 26px; font-weight: 700; color: #2563eb; margin-top: 5px; }}
            .kpi-label {{ font-size: 13px; color: #64748b; font-weight: 600; text-transform: uppercase; }}
            table {{ width: 100%; border-collapse: collapse; margin-top: 20px; }}
            th {{ background: #f1f5f9; text-align: left; padding: 12px 10px; border-bottom: 2px solid #cbd5e1; font-size: 13px; text-transform: uppercase; color: #475569; }}
            .footer {{ margin-top: 40px; font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; }}
        </style>
    </head>
    <body>
        <div class="header">
            <div>
                <div class="logo">CORPORATE TRAVEL ANALYTICS CORPORATE TRAVEL INTELLIGENCE</div>
                <div style="color: #64748b; font-size: 14px; margin-top: 4px;">C-Suite Monthly Executive Briefing Report</div>
            </div>
            <div class="badge">CONFIDENTIAL & GOVERNED</div>
        </div>

        <div class="kpi-grid">
            <div class="kpi-card">
                <div class="kpi-label">Total Spend (INR)</div>
                <div class="kpi-num">₹{total_spend_inr:,.2f}</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-label">Active Tickets</div>
                <div class="kpi-num">{total_tickets - cancelled_count}</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-label">Cross-Border Trips</div>
                <div class="kpi-num">{cross_border_count}</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-label">Cancellations / Refunds</div>
                <div class="kpi-num">{cancelled_count}</div>
            </div>
        </div>

        <h3>Business Unit Expense Breakdown</h3>
        <table>
            <thead>
                <tr>
                    <th>Business Unit</th>
                    <th style="text-align: center;">Total Flown Trips</th>
                    <th style="text-align: right;">Total Expenditure (INR)</th>
                </tr>
            </thead>
            <tbody>
                {bu_rows}
            </tbody>
        </table>

        <div class="footer">
            Generated automatically via Corporate Travel Analytics Governed Travel Analytics Engine (vw_travel).
        </div>
    </body>
    </html>
    """
    return html_content

def generate_pbit_template() -> str:
    """
    Generates a Power BI template package (.pbit) referencing the governed SQL View vw_travel.
    """
    output_path = os.path.join(os.path.dirname(__file__), "..", "data", "Travel_Analytics_Dashboard.pbit")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    schema = {
        "name": "TravelAnalyticsDataModel",
        "description": "Governed Corporate Travel Analytics Model connected to vw_travel view",
        "version": "2.1.0",
        "entities": [
            {
                "name": "vw_travel",
                "source": "SQL View vw_travel",
                "columns": [
                    "ticket_id", "trip_id", "batch_id", "employee_id", "employee_name",
                    "business_unit", "department", "issue_date", "travel_date", "return_date",
                    "origin_city", "origin_country", "dest_city", "dest_country",
                    "amount_inr", "booking_channel", "cabin_class", "travelled_flag",
                    "trip_classification", "travel_summary", "policy_compliance_status"
                ]
            }
        ]
    }
    
    with zipfile.ZipFile(output_path, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("DataModelSchema", json.dumps(schema, indent=2))
        z.writestr("Version", "1.13")
        z.writestr("README.txt", "Connect this template directly to PostgreSQL/SQLite view: vw_travel")
        
    return output_path
