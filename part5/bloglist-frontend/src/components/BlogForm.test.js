import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByPlaceholderText('title of the blog')
  const author = screen.getByPlaceholderText('blog author')
  const url = screen.getByPlaceholderText('link to blog')
  const sendButton = screen.getByText('save')

  await user.type(title, 'Jest testing')
  await user.type(author, 'Mr Jest')
  await user.type(url, 'www.jest.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Jest testing',
    author: 'Mr Jest',
    url: 'www.jest.com'
  })
})

