const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const { gitignore } = require('./templates/gitignore');
const { make } = require('./templates/make');
const { question } = require('./templates/question');
const { task } = require('./templates/task');

const questions = [
  {
    name: 'folder',
    type: 'input',
    validate: s => !s.trim().includes(' '),
    message: 'Where should I put this project?'
  },
  {
    name: 'title',
    type: 'input',
    message: 'What is the title of the project?'
  },
  {
    name: 'name',
    type: 'input',
    message: 'What is your name?'
  },
  {
    name: 'due',
    type: 'input',
    message: 'What is the due date?'
  },
  {
    name: 'student',
    type: 'input',
    message: 'What is your student number?'
  },
  {
    name: 'questions',
    type: 'input',
    validate: s => !isNaN(Number(s)),
    message: 'How many questions are there?'
  }
];

const run = async () => {
  const data = await inquirer.prompt(questions);

  let folder = path.resolve(process.cwd(), data.folder);
  let previous = path.resolve(folder, '..')

  if (fs.existsSync(folder)) {
    console.error(chalk.red(`Folder "${folder}" already exists! Please remove it and try again.`));
    process.exit(1);
  }

  fs.mkdirSync(folder);

  fs.mkdirSync(`${folder}/questions`);
  fs.mkdirSync(`${folder}/graphs`);

  fs.writeFileSync(`${folder}/task.tex`, task(data));
  fs.writeFileSync(`${folder}/.gitignore`, gitignore(data));
  fs.writeFileSync(`${folder}/makefile`, make(data));

  for (let i = 1; i <= Number(data.questions); i++) {
    fs.writeFileSync(`${folder}/questions/q_${i}.tex`, question({ number: i }));
  }

  fs.copyFileSync(path.resolve(__dirname, '..', 'example-sketch.png'), path.resolve(folder, 'graphs', 'example-sketch.png'));

  try {
    execSync(`git init && git add . && git commit -m " ${data.title}"`, { cwd: folder });
  } catch (e) {
    console.error(chalk.yellow(`
      Failed to add files to git repo!
      Your project had still been created, but you may have to manually add the files.
    `));
  }

  try {
    execSync(`make`, { cwd: folder });
  } catch (e) {
    console.error(chalk.yellow(`
      Failed to compile! Please make sure you have both "make" and "pdflatex" installed.
    `));
  }

  console.log(chalk.white(`
    Project bootstrap complete.

    To build the report, execute the "make" command from your shell.
    Alternatively, execute ":make" from inside vim or neovim.

    For the best experience, open the report in an auto-refreshing pdf viewer
    such as "zathura".

    Enjoy!
  `));

};

run();
