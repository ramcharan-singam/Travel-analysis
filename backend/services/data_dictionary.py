def get_governed_data_dictionary() -> dict:
    """
    Returns the governed data dictionary and column definitions for the analytical view vw_travel
    and core dimensional / fact tables.
    """
    return {
        "view_name": "vw_travel",
        "description": "Enterprise governed analytical projection of the enriched fact table (FactTravelTicket).",
        "primary_database_key": "id (INTEGER, Primary Key)",
        "natural_business_key": "ticket_id (STRING)",
        "trip_grouping_key": "trip_id (STRING)",
        "hash_algorithm": "SHA-256 Cryptographic Hash",
        "columns": [
            {"column_name": "ticket_id", "data_type": "STRING", "description": "Unique vendor ticket identifier (Natural Business Key)."},
            {"column_name": "trip_id", "data_type": "STRING", "description": "Corporate trip grouping ID linking multileg itineraries."},
            {"column_name": "batch_id", "data_type": "STRING", "description": "ETL Ingestion batch identifier."},
            {"column_name": "employee_id", "data_type": "STRING", "description": "Corporate employee identifier (Dimension Key)."},
            {"column_name": "employee_name", "data_type": "STRING", "description": "Enriched employee full name from EmployeeMaster."},
            {"column_name": "business_unit", "data_type": "STRING", "description": "SCD Type-2 historical business unit at time of travel."},
            {"column_name": "department", "data_type": "STRING", "description": "SCD Type-2 historical department at time of travel."},
            {"column_name": "issue_date", "data_type": "STRING (ISO YYYY-MM-DD)", "description": "Date ticket was issued."},
            {"column_name": "travel_date", "data_type": "STRING (ISO YYYY-MM-DD)", "description": "Outbound departure date."},
            {"column_name": "return_date", "data_type": "STRING (ISO YYYY-MM-DD)", "description": "Return arrival date."},
            {"column_name": "origin_city", "data_type": "STRING", "description": "Departure city."},
            {"column_name": "origin_country", "data_type": "STRING", "description": "Departure country name."},
            {"column_name": "dest_city", "data_type": "STRING", "description": "Destination city."},
            {"column_name": "dest_country", "data_type": "STRING", "description": "Destination country name."},
            {"column_name": "origin_iso", "data_type": "STRING(2)", "description": "ISO Alpha-2 origin country code from CountryReference."},
            {"column_name": "dest_iso", "data_type": "STRING(2)", "description": "ISO Alpha-2 destination country code from CountryReference."},
            {"column_name": "ticket_status", "data_type": "STRING", "description": "Vendor booking lifecycle status (ISSUED, CANCELLED, REFUNDED, etc.)."},
            {"column_name": "amount_inr", "data_type": "FLOAT", "description": "Total spend normalized into INR base currency."},
            {"column_name": "booking_channel", "data_type": "STRING", "description": "Booking source channel (Amadeus GDS, Sabre GDS, Corporate Portal)."},
            {"column_name": "cabin_class", "data_type": "STRING", "description": "Cabin tier (Economy, Premium Economy, Business)."},
            {"column_name": "travelled_flag", "data_type": "STRING(1)", "description": "Calculated indicator 'Y' if travelled, 'N' if cancelled/refunded."},
            {"column_name": "trip_classification", "data_type": "STRING", "description": "Derived classification: Domestic, Cross-Border, or Multi-Country."},
            {"column_name": "travel_summary", "data_type": "STRING", "description": "Standardized route summary (e.g. IN to US Cross-Border)."},
            {"column_name": "policy_compliance_status", "data_type": "STRING", "description": "COMPLIANT or NON_COMPLIANT policy indicator."},
            {"column_name": "approval_status", "data_type": "STRING", "description": "Manager approval status (APPROVED, REJECTED, PENDING_APPROVAL)."},
            {"column_name": "override_applied", "data_type": "INTEGER", "description": "1 if manual analyst override was applied, 0 otherwise."}
        ]
    }
