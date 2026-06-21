const readline = require('readline');

const STORAGE = {
  balance: 1000.0,
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const displayMenu = () => {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
};

const readBalance = () => STORAGE.balance;

const writeBalance = (newBalance) => {
  STORAGE.balance = newBalance;
};

const promptAmount = (promptText) => {
  return new Promise((resolve) => {
    rl.question(promptText, (input) => {
      const parsed = parseFloat(input);
      resolve(parsed);
    });
  });
};

const performOperation = async (operationType) => {
  if (operationType === 'TOTAL') {
    const currentBalance = readBalance();
    console.log(`Current balance: ${currentBalance.toFixed(2)}`);
    return;
  }

  if (operationType === 'CREDIT') {
    const amount = await promptAmount('Enter credit amount: ');
    const currentBalance = readBalance();
    const newBalance = currentBalance + amount;
    writeBalance(newBalance);
    console.log(`Amount credited. New balance: ${newBalance.toFixed(2)}`);
    return;
  }

  if (operationType === 'DEBIT') {
    const amount = await promptAmount('Enter debit amount: ');
    const currentBalance = readBalance();
    if (currentBalance >= amount) {
      const newBalance = currentBalance - amount;
      writeBalance(newBalance);
      console.log(`Amount debited. New balance: ${newBalance.toFixed(2)}`);
    } else {
      console.log('Insufficient funds for this debit.');
    }
    return;
  }
};

const main = async () => {
  let continueFlag = true;

  while (continueFlag) {
    displayMenu();
    const choice = await new Promise((resolve) => {
      rl.question('Enter your choice (1-4): ', (input) => {
        resolve(parseInt(input, 10));
      });
    });

    switch (choice) {
      case 1:
        await performOperation('TOTAL');
        break;
      case 2:
        await performOperation('CREDIT');
        break;
      case 3:
        await performOperation('DEBIT');
        break;
      case 4:
        continueFlag = false;
        break;
      default:
        console.log('Invalid choice, please select 1-4.');
        break;
    }
  }

  console.log('Exiting the program. Goodbye!');
  rl.close();
};

if (require.main === module) {
  main();
}

module.exports = {
  STORAGE,
  readBalance,
  writeBalance,
  promptAmount,
  performOperation,
  displayMenu,
};
