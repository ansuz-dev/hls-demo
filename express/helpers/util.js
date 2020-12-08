function normEmail(email) {
  return email ? email.trim().toLowerCase() : null;
}

export default {
  normEmail,
};
