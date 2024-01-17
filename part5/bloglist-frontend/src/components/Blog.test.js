import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Tester',
  url: 'www.testing.com',
  likes: 0,
  user: '102948'
}
const updateLikes = () => {
  const updatedBlog = 'updated'
}
const removeBlog = () => {
  const filteredBlogs = 'removed'
}

test('renders title and author', () => {
  render(<Blog blog={blog} updateLikes={updateLikes} removeBlog={removeBlog} loggedUser='test'/>)

  const element = screen.getByText('Component testing is done with react-testing-library - Tester')
  expect(element).toBeDefined()
})

test('does not render website', () => {
  render(<Blog blog={blog} updateLikes={updateLikes} removeBlog={removeBlog} loggedUser='test'/>)

  const element = screen.queryByText('www.testing.com')
  expect(element).toBeNull()
})

test('does not render likes', () => {
  render(<Blog blog={blog} updateLikes={updateLikes} removeBlog={removeBlog} loggedUser='test'/>)

  const element = screen.queryByText('Likes 0')
  expect(element).toBeNull()
})

test('clicking view shows website and likes', async () => {
  render(<Blog blog={blog} updateLikes={updateLikes} removeBlog={removeBlog} loggedUser='test'/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element = screen.queryByText('www.testing.com')
  const element2 = screen.queryByText('Likes 0')
})

test('clicking view shows website and likes', async () => {
  const mockHandler = jest.fn()

  render(<Blog blog={blog} updateLikes={mockHandler} removeBlog={removeBlog} loggedUser='test'/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const like = screen.getByText('Like')
  await user.click(like)
  await user.click(like)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

