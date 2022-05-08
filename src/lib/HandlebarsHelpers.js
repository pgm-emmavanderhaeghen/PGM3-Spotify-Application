// A module with some custom block helpers

export default {
  button(type, className, options) {
    return `<button type="${type}" class="${className}">${options.fn(
      this
    )}</button>`;
  },
  modalButton(type, className, data, options) {
    return `<button type="${type}" class="${className}" data-open="${data}">${options.fn(
      this
    )}</button>`;
  },
  admin(role, options) {
    if (role === 'admin') {
      return `${options.fn()}`;
    }
  },
  editor(role, options) {
    if (role === 'editor' || role === 'admin') {
      return `${options.fn()}`;
    }
  },
};
