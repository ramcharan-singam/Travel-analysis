// =========================================================================
// Corporate Travel Analytics — Power Query (M) Script
// Governed Entity: vw_travel
// =========================================================================

// OPTION 1: PostgreSQL DirectQuery / Import Connector
let
    // 1. Connect to PostgreSQL Instance
    Source = PostgreSQL.Database("localhost:5433", "travel_analytics"),
    
    // 2. Select Public Schema and vw_travel View
    public_Schema = Source{[Schema="public"]}[Data],
    vw_travel_View = public_Schema{[Name="vw_travel"]}[Data],
    
    // 3. Enforce Strict Data Typing across all 36 Governed Attributes
    #"Changed Types" = Table.TransformColumnTypes(vw_travel_View, {
        {"ticket_id", type text},
        {"trip_id", type text},
        {"employee_id", type text},
        {"manager_id", type text},
        {"issue_date", type date},
        {"travel_date", type date},
        {"return_date", type date},
        {"travel_year", Int64.Type},
        {"travel_quarter", Int64.Type},
        {"travel_month", Int64.Type},
        {"employee_name", type text},
        {"email", type text},
        {"business_unit", type text},
        {"department", type text},
        {"designation", type text},
        {"location", type text},
        {"quarterly_allowance_inr", type number},
        {"origin_city", type text},
        {"origin_country", type text},
        {"dest_city", type text},
        {"dest_country", type text},
        {"origin_country_code", type text},
        {"dest_country_code", type text},
        {"origin_region", type text},
        {"dest_region", type text},
        {"is_cross_border", type text},
        {"amount_original", type number},
        {"currency", type text},
        {"fx_rate", type number},
        {"amount_inr", type number},
        {"fx_rate_date", type date},
        {"fx_source", type text},
        {"ticket_status", type text},
        {"booking_channel", type text},
        {"cabin_class", type text},
        {"travelled_flag", type text},
        {"classification", type text},
        {"summary", type text},
        {"is_flagged", type text},
        {"flag_reason", type text},
        {"is_overridden", type text},
        {"override_reason", type text},
        {"batch_id", type text},
        {"cleansed_at", type datetime}
    })
in
    #"Changed Types"


// -------------------------------------------------------------------------
// OPTION 2: SQLite ODBC Connector (Development / Local Evaluation)
// -------------------------------------------------------------------------
/*
let
    Source = Odbc.Query("driver={SQLite3 ODBC Driver};Database=C:\Users\Pranet\Downloads\Mass Mutual\backend\database\travel_analytics.db;", "SELECT * FROM vw_travel"),
    #"Changed Types" = Table.TransformColumnTypes(Source, {
        {"ticket_id", type text},
        {"trip_id", type text},
        {"employee_id", type text},
        {"manager_id", type text},
        {"issue_date", type date},
        {"travel_date", type date},
        {"return_date", type date},
        {"travel_year", Int64.Type},
        {"travel_quarter", Int64.Type},
        {"travel_month", Int64.Type},
        {"employee_name", type text},
        {"email", type text},
        {"business_unit", type text},
        {"department", type text},
        {"designation", type text},
        {"location", type text},
        {"quarterly_allowance_inr", type number},
        {"origin_city", type text},
        {"origin_country", type text},
        {"dest_city", type text},
        {"dest_country", type text},
        {"origin_country_code", type text},
        {"dest_country_code", type text},
        {"origin_region", type text},
        {"dest_region", type text},
        {"is_cross_border", type text},
        {"amount_original", type number},
        {"currency", type text},
        {"fx_rate", type number},
        {"amount_inr", type number},
        {"fx_rate_date", type date},
        {"fx_source", type text},
        {"ticket_status", type text},
        {"booking_channel", type text},
        {"cabin_class", type text},
        {"travelled_flag", type text},
        {"classification", type text},
        {"summary", type text},
        {"is_flagged", type text},
        {"flag_reason", type text},
        {"is_overridden", type text},
        {"override_reason", type text},
        {"batch_id", type text},
        {"cleansed_at", type datetime}
    })
in
    #"Changed Types"
*/
