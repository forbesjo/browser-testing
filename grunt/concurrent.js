module.exports = {
  local: [
    'protractor:local',
    'protractor:devices'
  ],
  ci: [
    'protractor:sauce',
    'protractor:devices'
  ]
};
