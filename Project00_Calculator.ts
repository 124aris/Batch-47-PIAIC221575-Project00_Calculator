#!/usr/bin/env node

import chalk from 'chalk';

import inquirer from 'inquirer';

console.clear();

enum operators{
    Add = "Addition",
    Subtract = "Subtraction",
    Multiply = "Multiplication",
    Divide = "Division",
};

async function NumberInput(message: string): Promise<number>{
    const input = await inquirer.prompt([{
        type: 'input',
        name: 'number',
        message,
        validate: (input) => {
            return !isNaN(parseFloat(input)) && isFinite(input)? true: chalk.redBright('Please Enter A Valid Number.');
        },
    }]);
    return parseFloat(input.number);
};

async function calculator(){
    console.log(chalk.yellowBright('Simple Calculator'));
    while (true){
        const firstNumber = await NumberInput(chalk.cyanBright('Enter The First Number:'));
        const operator: operators = (
            await inquirer.prompt ([{
                type: "list",
                name: "operator",
                message: chalk.blueBright("Select An Operator:"),
                choices: Object.values(operators),
            }])
        ).operator;
        const secondNumber = await NumberInput(chalk.cyanBright('Enter The Second Number:'));
        let result: number;
        switch (operator){
            case operators.Add:
                result = firstNumber + secondNumber;
                break;
            case operators.Subtract:
                result = firstNumber - secondNumber;
                break;
            case operators.Multiply:
                result = firstNumber * secondNumber;
                break;
            case operators.Divide:
                result = firstNumber / secondNumber;
                break;
        };
        console.log(chalk.greenBright('Result:'), result);
        const { restart } = await inquirer.prompt([{
            type: 'confirm',
            name: 'restart',
            message: chalk.red('Do You Want To Perform Another Calculation?'),
            default: true,
        }]);
        if (!restart) {
            console.log(chalk.green('Goodbye!'));
            break;
        };
    };
};

calculator();