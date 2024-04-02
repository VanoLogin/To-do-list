const CHECKLIST_LS_KEY = "checklist";

function load() {
  try {
    return JSON.parse(localStorage.getItem(CHECKLIST_LS_KEY)) || [];
  } catch (err) {
    console.error(`Parsing error: ${err.message}`);
    return [];
  }
}
function save(data) {
  try {
    localStorage.setItem(CHECKLIST_LS_KEY, JSON.stringify(data));
  } catch (error) {
    console.error(`Stringify error: ${err.message}`);
  }
}
function remove() {
  localStorage.removeItem(CHECKLIST_LS_KEY);
}


export { load, save, remove };
