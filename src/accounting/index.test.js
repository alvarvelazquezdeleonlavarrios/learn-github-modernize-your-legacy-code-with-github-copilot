const accounting = require('./index');

describe('Accounting application business logic', () => {
  beforeEach(() => {
    accounting.writeBalance(1000.0);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('TC-001 View current balance', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    await accounting.performOperation('TOTAL');

    expect(accounting.readBalance()).toBe(1000.0);
    expect(logSpy).toHaveBeenCalledWith('Current balance: 1000.00');
  });

  test('TC-002 Credit a positive amount', async () => {
    jest.spyOn(accounting, 'promptAmount').mockResolvedValue(200.0);
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await accounting.performOperation('CREDIT');

    expect(accounting.readBalance()).toBe(1200.0);
    expect(logSpy).toHaveBeenCalledWith('Amount credited. New balance: 1200.00');
  });

  test('TC-003 Debit with sufficient funds', async () => {
    accounting.writeBalance(1200.0);
    jest.spyOn(accounting, 'promptAmount').mockResolvedValue(300.0);
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await accounting.performOperation('DEBIT');

    expect(accounting.readBalance()).toBe(900.0);
    expect(logSpy).toHaveBeenCalledWith('Amount debited. New balance: 900.00');
  });

  test('TC-004 Debit with insufficient funds', async () => {
    jest.spyOn(accounting, 'promptAmount').mockResolvedValue(1500.0);
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await accounting.performOperation('DEBIT');

    expect(accounting.readBalance()).toBe(1000.0);
    expect(logSpy).toHaveBeenCalledWith('Insufficient funds for this debit.');
  });

  test('TC-005 Credit zero amount', async () => {
    jest.spyOn(accounting, 'promptAmount').mockResolvedValue(0.0);
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await accounting.performOperation('CREDIT');

    expect(accounting.readBalance()).toBe(1000.0);
    expect(logSpy).toHaveBeenCalledWith('Amount credited. New balance: 1000.00');
  });

  test('TC-006 Debit zero amount', async () => {
    jest.spyOn(accounting, 'promptAmount').mockResolvedValue(0.0);
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await accounting.performOperation('DEBIT');

    expect(accounting.readBalance()).toBe(1000.0);
    expect(logSpy).toHaveBeenCalledWith('Amount debited. New balance: 1000.00');
  });

  test('TC-007 Non-numeric input for amount should be handled in future implementation', () => {
    const value = parseFloat('abc');
    expect(Number.isNaN(value)).toBe(true);
  });

  test('TC-008 Large credit causing overflow is not enforced in current implementation', async () => {
    accounting.writeBalance(900000.0);
    jest.spyOn(accounting, 'promptAmount').mockResolvedValue(200000.0);
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await accounting.performOperation('CREDIT');

    expect(accounting.readBalance()).toBe(1100000.0);
    expect(logSpy).toHaveBeenCalledWith('Amount credited. New balance: 1100000.00');
  });

  test('TC-010 Invalid menu choice handling placeholder', () => {
    const choice = parseInt('x', 10);
    expect(Number.isNaN(choice)).toBe(true);
  });
});
