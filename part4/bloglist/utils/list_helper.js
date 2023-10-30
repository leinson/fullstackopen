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

const listWithBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]


console.log('total',totalLikes(listWithBlogs))


module.exports = {
  dummy, totalLikes
}