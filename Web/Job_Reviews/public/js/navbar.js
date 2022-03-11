const toggleSearch = () => {
  document.getElementById("searchInput").classList.toggle("hidden");
};
const mdOptionsToggle = () => {
  document.getElementById("md-searchbar").classList.toggle("hidden");
  document.getElementById("md-searchbar").classList.toggle("flex");
};
const openMenu = () => {
  document.getElementById("mobile-menu").classList.remove("hidden");
};
const closeMenu = () => {
  document.getElementById("mobile-menu").classList.add("hidden");
};
