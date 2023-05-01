import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList from './todolist';

describe('TodoList', () => {
  it('should add a new todo item when the form is submitted', () => {
    const { getByLabelText, getByText, getAllByRole } = render(<TodoList />);
    const input = getByLabelText('Add Item:');
    fireEvent.change(input, { target: { value: 'New todo item' } });
    fireEvent.submit(getByText('Add'));
    const items = getAllByRole('listitem');
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent('New todo item');
  });

  it('should toggle the completed state of a todo item when the checkbox is clicked', () => {
    const { getByLabelText, getAllByRole } = render(<TodoList />);
    const input = getByLabelText('Add Item:');
    fireEvent.change(input, { target: { value: 'New todo item' } });
    fireEvent.submit(getByLabelText('Add'));
    const checkbox = getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    const items = getAllByRole('listitem');
    expect(items[0]).toHaveStyle('text-decoration: line-through');
  });

  it('should delete a todo item when the delete button is clicked', () => {
    const { getByLabelText, getByText, getAllByRole, queryByText } = render(<TodoList />);
    const input = getByLabelText('Add Item:');
    fireEvent.change(input, { target: { value: 'New todo item' } });
    fireEvent.submit(getByLabelText('Add'));
    fireEvent.click(getByText('Delete'));
    const items = getAllByRole('listitem');
    expect(items).toHaveLength(0);
    expect(queryByText('New todo item')).not.toBeInTheDocument();
  });
});
