// I need to abstract:
// ORM syntax - For now actually i can just keep it as it is, and if i change it in the future i can just abstract then.
// Joins - every join that is not directly in the table. so if i want to grab tasks based on user pref, i need to join users then prefs.
// Search - For given search string, i need to abstract all fields that are searchable and build search clause
// Pagination - i need to abstract given a index and pagecount to return paginated results.

