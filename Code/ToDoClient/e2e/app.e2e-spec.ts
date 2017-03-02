import { ToDoClientPage } from './app.po';

describe('to-do-client App', () => {
  let page: ToDoClientPage;

  beforeEach(() => {
    page = new ToDoClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
