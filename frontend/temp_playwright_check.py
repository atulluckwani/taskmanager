from playwright.sync_api import sync_playwright

p = sync_playwright().start()
print('chromium:', p.chromium.executable_path())
p.stop()
