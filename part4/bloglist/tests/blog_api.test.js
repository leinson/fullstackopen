const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

describe('when there is blogs already saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there is two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('id-field is named id and not _id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })

  describe('when a new blog is added', () => {

    test('it succeeds and content is correct ', async () => {
      const newBlog = {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const titles = response.body.map(r => r.title)

      expect(response.body).toHaveLength(initialBlogs.length + 1)
      expect(titles).toContain(
        'Type wars'
      )
    })
    test('if there is no likes value, it is set to zero', async () => {
      const newBlog = {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      expect(response.body[2].likes).toBe(0)
    })
    test('if there is no title or url, the statuscode is 400', async () => {
      const newBlog = {
        author: 'Robert C. Martin'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(initialBlogs.length)
    })

  })
  describe('when a blog is deleted', () => {
    test('the statuscode is 204 and the blog has dissapeared', async () => {
      const blogsAtStart = await api.get('/api/blogs')
      const blogToDelete = blogsAtStart.body[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(initialBlogs.length -1)
    })
  })
  describe('when a blog is changed', () => {
    test('the changed value is correct', async () => {
      const blogsAtStart = await api.get('/api/blogs')
      const blogToChange = blogsAtStart.body[0]
      const changedBlog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 10
      }
      await api
        .put(`/api/blogs/${blogToChange.id}`)
        .send(changedBlog)
        .expect(200)

      const response = await api.get('/api/blogs')
      expect(response.body[0].likes).toBe(10)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})