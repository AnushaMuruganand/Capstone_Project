\echo 'Delete and recreate map_weather db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE map_weather;
CREATE DATABASE map_weather;
\connect map_weather

\i map_weather-schema.sql
