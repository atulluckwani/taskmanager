from datetime import date, timedelta
from playwright.sync_api import sync_playwright


def test_create_task_with_all_fields():
    """TC-01: Create a task with all required fields."""
    task_title = "Buy groceries"
    task_description = "Weekly shopping list"
    due_date = (date.today() + timedelta(days=1)).strftime("%Y-%m-%d")

    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=False)
        page = browser.new_page()

        page.goto("http://localhost:3000")
        page.wait_for_selector('form.task-form input[name="title"]', timeout=10000)

        page.fill('form.task-form input[name="title"]', task_title)
        page.fill('form.task-form textarea[name="description"]', task_description)
        page.fill('form.task-form input[name="due_date"]', due_date)
        page.select_option('form.task-form select[name="priority"]', "High")

        page.click('form.task-form button[type="submit"]')

        page.wait_for_selector(f'.task-item:has-text("{task_title}")', timeout=10000)
        task_item = page.locator(f'.task-item:has-text("{task_title}")').first
        assert task_item.is_visible(), "Created task should be visible in the list"

        assert page.input_value('form.task-form input[name="title"]') == ""
        assert page.input_value('form.task-form textarea[name="description"]') == ""

        print("TC-01 PASSED: Task created successfully and form cleared")
        browser.close()


if __name__ == "__main__":
    test_create_task_with_all_fields()
