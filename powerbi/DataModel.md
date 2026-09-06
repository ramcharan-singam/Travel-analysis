# Power BI Data Model Specification — `vw_travel`

## Overview
The data model for the Corporate Travel Analytics platform is organized as a unified analytical view (`vw_travel`) conforming to a Star Schema representation. Each record represents an individual travel ticket enriched with SCD Type 2 employee history, geographic master data, financial FX lineage, and compliance rule evaluations.

---

## Complete Data Dictionary (36 Governed Attributes)

### 1. Primary Keys & Identifiers
| Column Name | SQL Type | Description | Sample Value |
| :--- | :--- | :--- | :--- |
| `ticket_id` | `VARCHAR(50)` | Unique travel ticket number (Fact Key) | `TCK-8001` |
| `trip_id` | `VARCHAR(50)` | Associated multi-leg or round-trip identifier | `TRP-101` |
| `employee_id` | `VARCHAR(50)` | Corporate employee ID | `EMP-1001` |
| `manager_id` | `VARCHAR(50)` | Assigned reporting manager ID | `MGR-5002` |

### 2. Temporal & Date Attributes
| Column Name | SQL Type | Description | Sample Value |
| :--- | :--- | :--- | :--- |
| `issue_date` | `DATE` / `TEXT` | Date ticket was booked/issued | `2026-01-05` |
| `travel_date` | `DATE` / `TEXT` | Departure/Travel start date | `2026-01-12` |
| `return_date` | `DATE` / `TEXT` | Return travel date | `2026-01-15` |
| `travel_year` | `INTEGER` | Extracted travel year | `2026` |
| `travel_quarter` | `INTEGER` | Extracted travel quarter (1–4) | `1` |
| `travel_month` | `INTEGER` | Extracted travel month (1–12) | `1` |

### 3. Employee Master Dimension (SCD Type 2 Point-in-Time)
| Column Name | SQL Type | Description | Sample Value |
| :--- | :--- | :--- | :--- |
| `employee_name` | `VARCHAR(200)` | Full name of the traveling employee | `Rajesh Sharma` |
| `email` | `VARCHAR(200)` | Corporate email address | `rajesh.sharma@travelintelligence.com` |
| `business_unit` | `VARCHAR(100)` | Business Unit at the time of travel | `Global Technology` |
| `department` | `VARCHAR(100)` | Department at the time of travel | `Software Engineering` |
| `designation` | `VARCHAR(100)` | Designation / Corporate title | `Senior Principal Engineer` |
| `location` | `VARCHAR(100)` | Employee base corporate office | `Bengaluru` |
| `quarterly_allowance_inr` | `FLOAT` | Approved quarterly travel budget | `250000.00` |

### 4. Route & Geographic Dimension
| Column Name | SQL Type | Description | Sample Value |
| :--- | :--- | :--- | :--- |
| `origin_city` | `VARCHAR(100)` | Departure city | `Bengaluru` |
| `origin_country` | `VARCHAR(100)` | Departure country name | `India` |
| `dest_city` | `VARCHAR(100)` | Arrival destination city | `Mumbai` |
| `dest_country` | `VARCHAR(100)` | Arrival destination country name | `India` |
| `origin_country_code` | `VARCHAR(10)` | ISO country code for origin | `IN` |
| `dest_country_code` | `VARCHAR(10)` | ISO country code for destination | `IN` |
| `origin_region` | `VARCHAR(50)` | Global geographic region of origin | `APAC` |
| `dest_region` | `VARCHAR(50)` | Global geographic region of destination | `APAC` |
| `is_cross_border` | `VARCHAR(1)` | `Y` if origin country != dest country, else `N` | `N` |

### 5. Financial & Auditable FX Lineage
| Column Name | SQL Type | Description | Sample Value |
| :--- | :--- | :--- | :--- |
| `amount_original` | `FLOAT` | Transaction amount in booking currency | `14500.00` |
| `currency` | `VARCHAR(10)` | Booking transaction currency code | `INR` |
| `fx_rate` | `FLOAT` | Applied exchange rate to INR | `1.0000` |
| `amount_inr` | `FLOAT` | Governed amount converted to INR | `14500.00` |
| `fx_rate_date` | `DATE` / `TEXT` | Effective date of the FX conversion rate | `2026-01-01` |
| `fx_source` | `VARCHAR(100)` | Authoritative source of FX conversion | `Corporate Treasury Fixed 2026` |

### 6. Booking & Policy Compliance
| Column Name | SQL Type | Description | Sample Value |
| :--- | :--- | :--- | :--- |
| `ticket_status` | `VARCHAR(50)` | Booking state (`ISSUED`, `CANCELLED`, `REFUNDED`, etc.) | `ISSUED` |
| `booking_channel` | `VARCHAR(100)` | Booking portal/GDS channel | `Amadeus GDS` |
| `cabin_class` | `VARCHAR(50)` | Travel class (`Economy`, `Business`, `Premium Economy`) | `Economy` |
| `travelled_flag` | `VARCHAR(1)` | Effective travel completion (`Y` or `N`) | `Y` |
| `classification` | `VARCHAR(50)` | Route classification (`Domestic` vs `Cross-Border`) | `Domestic` |
| `summary` | `VARCHAR(255)` | Policy evaluation summary | `Domestic standard travel` |
| `is_flagged` | `VARCHAR(1)` | Policy exception/violation flag (`Y` or `N`) | `N` |
| `flag_reason` | `VARCHAR(255)` | Reason for policy flag | `None` |

### 7. Governance, Overrides & Audit Lineage
| Column Name | SQL Type | Description | Sample Value |
| :--- | :--- | :--- | :--- |
| `is_overridden` | `VARCHAR(1)` | `Y` if analyst applied manual override, else `N` | `N` |
| `override_reason` | `TEXT` | Business justification for manual override | `Analyst verified employee boarded replacement flight` |
| `batch_id` | `VARCHAR(100)` | ETL Pipeline Batch identifier | `BATCH_20260904_183224_195145` |
| `cleansed_at` | `TIMESTAMP` | Timestamp of ETL pipeline execution | `2026-09-04 18:32:24` |

---

## Star Schema Logical Relationship Mapping

```
     ┌────────────────────────────────────────────────────────┐
     │                     Dim_Employee                       │
     │  (employee_id, employee_name, business_unit, dept...)  │
     └───────────────────────────┬────────────────────────────┘
                                 │ 1
                                 │
                                 │ *
┌──────────────────────┐   ┌─────┴────────────────┐   ┌──────────────────────┐
│       Dim_Date       │ 1 │                      │ 1 │     Dim_Geography    │
│ (travel_date, month, ├───┤    Fact_vw_travel    ├───┤  (origin_country,    │
│  quarter, year...)   │ * │ (ticket_id, amount...)│ * │   dest_country, etc.)│
└──────────────────────┘   └─────┬────────────────┘   └──────────────────────┘
                                 │ *
                                 │
                                 │ 1
     ┌───────────────────────────┴────────────────────────────┐
     │                      Dim_FXRate                        │
     │      (currency, fx_rate, fx_rate_date, fx_source)      │
     └────────────────────────────────────────────────────────┘
```
