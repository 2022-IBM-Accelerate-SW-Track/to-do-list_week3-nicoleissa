import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const add = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(add);

  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(add);

  const check = screen.getByText(/Test/i);
  expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const add = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, { target: { value: ""}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(add);

  const noCheck = screen.getByText(/You have no todo's left/i);
  expect(noCheck).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const add = screen.getByRole('button', {name: /Add/i});

  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: null}});
  fireEvent.click(add);

  const noCheck = screen.getByText(/You have no todo's left/i);
  expect(noCheck).toBeInTheDocument();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const add = screen.getByRole('button', {name: /Add/i});
  const dueDate = "11/30/2023";

  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(add);

  const check = screen.getByText(/Test/i);
  expect(check).toBeInTheDocument();

  const checkDate = screen.getByText(new RegExp("11/30/2023", "i"));
  expect(checkDate).toBeInTheDocument();

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  const noCheck = screen.getByText(/You have no todo's left/i);
  expect(noCheck).toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const add = screen.getByRole('button', {name: /Add/i});
  const lateDate = "05/30/2022";

  fireEvent.change(inputTask, { target: { value: "Test"}});
  fireEvent.change(inputDate, { target: { value: lateDate}});
  fireEvent.click(add);

  const check = screen.getByText(/Test/i);
  expect(check).toBeInTheDocument();

  const checkDate = screen.getByText(new RegExp("5/30/2022", "i"));
  expect(checkDate).toBeInTheDocument();

  const colorCheck = check.style.background;
  expect(colorCheck).not.toBe("white");
 });
