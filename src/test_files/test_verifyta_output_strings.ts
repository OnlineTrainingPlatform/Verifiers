export const two_queries_passing = `Options for the verification:
Generating no trace
Search order is breadth first
Using conservative space optimisation
Seed is 1666875187
State space representation uses minimal constraint systems
←[2K
Verifying formula 1 at /nta/queries/query[1]/formula
←[2K -- Formula is satisfied.
-- States stored : 9 states
-- States explored : 9 states
-- CPU user time used : 0 ms
-- Virtual memory used : 49644 KiB
-- Resident memory used : 10940 KiB
←[2K
Verifying formula 2 at /nta/queries/query[2]/formula
←[2K -- Formula is satisfied.
-- States stored : 9 states
-- States explored : 9 states
-- CPU user time used : 0 ms
-- Virtual memory used : 49656 KiB
-- Resident memory used : 10952 KiB`;

export const two_queries_failing = `Options for the verification:
Generating no trace
Search order is breadth first
Using conservative space optimisation
Seed is 1667203920
State space representation uses minimal constraint systems
←[2K
Verifying formula 1 at /nta/queries/query[1]/formula
←[2K -- Formula is NOT satisfied.
-- States stored : 1 states
-- States explored : 0 states
-- CPU user time used : 16 ms
-- Virtual memory used : 49656 KiB
-- Resident memory used : 10944 KiB
←[2K
Verifying formula 2 at /nta/queries/query[2]/formula
←[2K -- Formula is NOT satisfied.
-- States stored : 9 states
-- States explored : 8 states
-- CPU user time used : 0 ms
-- Virtual memory used : 49716 KiB
-- Resident memory used : 10992 KiB`;

export const no_syntax_error = `Options for the verification:
  Generating no trace
  Search order is breadth first
  Using conservative space optimisation
  Seed is 1666874848
  State space representation uses minimal constraint systems`;

export const one_syntax_error = `C:\\Users\\freja\\Desktop\\Verifiers\\src\\test_files\\lightswitch_syntaxError.xml:/nta/template[4]/transition[4]/label[1]:1: [error] syntax error: unexpected T_ID, expecting ':'.
synax error`;

export const one_query_failing_one_passing = `Options for the verification:
Generating no trace
Search order is breadth first
Using conservative space optimisation
Seed is 1666954223
State space representation uses minimal constraint systems
←[2K
Verifying formula 1 at /nta/queries/query[1]/formula
←[2K -- Formula is NOT satisfied.
-- States stored : 1 states
-- States explored : 0 states
-- CPU user time used : 0 ms
-- Virtual memory used : 49664 KiB
-- Resident memory used : 10948 KiB
←[2K
Verifying formula 2 at /nta/queries/query[2]/formula
←[2K -- Formula is satisfied.
-- States stored : 9 states
-- States explored : 9 states
-- CPU user time used : 0 ms
-- Virtual memory used : 49704 KiB
-- Resident memory used : 10988 KiB`;
