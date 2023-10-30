const dummy = (blogs) => {
  console.log('blogs', blogs)
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce(
    (sum, item) => {
      return sum + item.likes
    },
    0)
  console.log('likes', likes)
  return likes
}

const favoriteBlog = (blogs) => {
  let favorite = null
  if (blogs.length !== 0) {
    favorite = blogs[0]

    for (let i = 0; i < blogs.length; i++) {
      if (favorite.likes < blogs[i].likes) {
        favorite = blogs[i]
      }
    }
  }
  return favorite

}

module.exports = {
  dummy, totalLikes, favoriteBlog
}