# Test Plan — COBOL Student Account System

This test plan documents test cases to validate the current COBOL application's business logic. Fill in `Actual Result` and `Status` after executing each test case with stakeholders.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|---|---|---|---|---|---|---|---|
| TC-001 | View current balance | `accountsystem` compiled and running; starting balance = 1000.00 | 1) Run app. 2) Enter choice `1` (View Balance). | Displays "Current balance: 1000.00" | TBD | TBD | Verifies `DataProgram` returns `STORAGE-BALANCE`. |
| TC-002 | Credit a positive amount | app running; starting balance = 1000.00 | 1) Choose `2` (Credit). 2) Enter `200.00`. 3) Choose `1` to view balance. | After credit, balance shows `1200.00` | TBD | TBD | Verifies add/write flow via `Operations` -> `DataProgram`. |
| TC-003 | Debit with sufficient funds | app running; starting balance = 1200.00 | 1) Choose `3` (Debit). 2) Enter `300.00`. 3) Choose `1` to view balance. | After debit, balance shows `900.00` | TBD | TBD | Verifies subtraction and write. |
| TC-004 | Debit with insufficient funds | app running; starting balance = 1000.00 | 1) Choose `3` (Debit). 2) Enter `1500.00`. | Displays "Insufficient funds for this debit." and balance remains `1000.00` | TBD | TBD | Ensures debit blocked when `FINAL-BALANCE < AMOUNT`. |
| TC-005 | Credit zero amount | app running; starting balance = 1000.00 | 1) Choose `2`. 2) Enter `0.00`. 3) View balance. | Balance remains `1000.00` (no change) | TBD | TBD | Confirms handling of zero amounts. |
| TC-006 | Debit zero amount | app running; starting balance = 1000.00 | 1) Choose `3`. 2) Enter `0.00`. 3) View balance. | Balance remains `1000.00` (no change) | TBD | TBD | Confirms handling of zero amounts. |
| TC-007 | Non-numeric input for amount | app running | 1) Choose `2` or `3`. 2) Enter `abc` (non-numeric). | Current implementation has no explicit validation; behavior undefined. Expected: application should reject non-numeric input or show an error. Record actual behavior. | TBD | TBD | Note: modernization should add input validation. |
| TC-008 | Large credit causing overflow | app running; starting balance = 900000.00 | 1) Choose `2`. 2) Enter `200000.00`. 3) View balance. | Expected: application prevents overflow beyond `999,999.99` or returns an error. Current behavior may overflow/garble value — record actual behavior. | TBD | TBD | `PIC 9(6)V99` max is `999,999.99`. |
| TC-009 | Exact operation token behavior | Binary running; testers may call Operations directly (integration) | 1) Execute call to `Operations` with tokens (`'TOTAL '`, `'CREDIT'`, `'DEBIT '`), or select menu options. | Operations trigger correct branch only for exact tokens (trailing spaces matter). | TBD | TBD | Verify tokens include expected spacing and match `IF` comparisons. |
| TC-010 | Invalid menu choice handling | app running | 1) At menu, enter `5` or non-numeric like `x`. | Displays "Invalid choice, please select 1-4." and reprompts. | TBD | TBD | Ensures menu EVALUATE WHEN OTHER path functions. |
| TC-011 | Persistence across runs | app compiled | 1) Start app. 2) Credit `100.00`. 3) Exit. 4) Restart app and view balance. | Current app stores balance only in memory; expected balance resets to initial `1000.00` on restart. | TBD | TBD | Confirms no persistence layer is present. |


## Notes for testers

- How to run non-interactively: use `printf` to simulate input, e.g. `printf "2\n200.00\n4\n" | ./accountsystem`.
- When executing tests with stakeholders, record the `Actual Result` and mark `Status` accordingly.
- For tests that expose undefined behavior (non-numeric input, overflow), capture console output and exact input used.
- This plan is designed to be translated into unit and integration tests in a Node.js implementation: each test maps to a scenario covering read/write, arithmetic, validation, and edge cases.

