module.exports = function (content, length) {
  length = length || 50;
  return content.split(' ').slice(0, length).join(' ') + '...'
}
