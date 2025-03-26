export function logUser() {
  console.log(`User ${getCurrentUserName()} is viewing the record`);
}

export function logFieldChange(field: string) {
  console.log(`User ${getCurrentUserName()} has changed the field ${field} value`);
}

function getCurrentUserName() {
  return Xrm.Utility.getGlobalContext().userSettings.userName;
}