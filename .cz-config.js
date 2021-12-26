'use strict';

module.exports = {
  types: [
    {
      value: '💪 WIP',
      name: 'Work in progress'
    },
    {
      value: '✨ feat',
      name: 'A new feature'
    },
    {
      value: '🐞 fix',
      name: 'A bug fix'
    },
    {
      value: '🛠 refactor',
      name: 'A code change that neither fixes a bug nor adds a feature'
    },
    {
      value: '📚 docs',
      name: 'Documentation only changes'
    },
    {
      value: '🏁 test',
      name: 'Add missing tests or correcting existing tests'
    },
    {
      value: '🗯 chore',
      name: 'Changes that don\'t modify src or test files. Such as updating build tasks, package manager'
    },
    {
      value: '💅 style',
      name: 'Code Style, Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)'
    },
    {
      value: '⏪ revert',
      name: 'Revert to a commit'
    }
  ],
  scopes: [
    { name: 'utils' },
    { name: 'docs' },
    { name: 'docker/compose' },
    { name: 'emojis' },
    { name: 'core' },
    { name: 'dot-files/configs' },
    { name: 'deployments' },
  ],
}