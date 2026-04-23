# 🐛 GitHub Issues — ECommerce Dashboard Practice

Copy each of these as a separate Issue in your GitHub repository.
Set Label: `bug` for all. Assign all to yourself initially.

---

## BUG-001 — Dashboard shows wrong Total Revenue
**Label:** bug | **Priority:** High

**Description:**
The Total Revenue stat card on the Dashboard page shows a hardcoded incorrect value (₹99,999) instead of computing the actual sum from all revenue data.

**Steps to Reproduce:**
1. Open the Dashboard page
2. Check the "Total Revenue" stat card
3. Value shows ₹99,999 regardless of actual data

**Expected Behavior:** Should calculate and display the correct sum of all monthly revenue.

**File:** `src/app/data.service.ts` — `getDashboardStats()` method

---

## BUG-002 — Bar chart renders incorrectly on Dashboard
**Label:** bug | **Priority:** High

**Description:**
The Monthly Revenue bar chart on Dashboard has 6 labels but only 4 data points, causing the last 2 bars to not render.

**Steps to Reproduce:**
1. Open Dashboard
2. Look at the "Monthly Revenue" bar chart
3. Only 4 bars visible despite 6 month labels

**Expected Behavior:** All 6 months should have bars with correct data.

**File:** `src/app/dashboard/dashboard.component.ts` — `barChartData`

---

## BUG-003 — Pie chart missing colors for 2 categories
**Label:** bug | **Priority:** Medium

**Description:**
The "Sales by Category" pie chart has 4 data segments but only 2 colors defined. Footwear and Accessories segments appear grey/undefined.

**Steps to Reproduce:**
1. Open Dashboard
2. Look at the "Sales by Category" pie chart
3. 2 segments have no color

**Expected Behavior:** All 4 segments should have distinct colors.

**File:** `src/app/dashboard/dashboard.component.ts` — `pieChartData.datasets.backgroundColor`

---

## BUG-004 — Revenue page shows blank screen on API error
**Label:** bug | **Priority:** High

**Description:**
The Revenue page randomly fails to load (50% chance simulating network error). When it fails, the page shows a completely blank screen instead of the error message UI.

**Steps to Reproduce:**
1. Open Revenue page
2. Refresh multiple times
3. Sometimes page is blank with no error shown

**Expected Behavior:** Error state UI with retry button should be visible.

**File:** `src/app/revenue/revenue.component.ts` — error handler in `ngOnInit()`

---

## BUG-005 — Dashboard recent orders not sorted by date
**Label:** bug | **Priority:** Low

**Description:**
The "Recent Orders" table on Dashboard shows the first 5 orders from the array instead of the 5 most recently placed orders.

**Steps to Reproduce:**
1. Open Dashboard
2. Check "Recent Orders" section
3. Orders are not sorted by date descending

**Expected Behavior:** Should show the 5 most recent orders sorted by date descending.

**File:** `src/app/dashboard/dashboard.component.ts` — `ngOnInit()`

---

## BUG-006 — Orders table sort direction never toggles
**Label:** bug | **Priority:** Medium

**Description:**
Clicking any column header in the Orders table sorts ascending but clicking again does not toggle to descending. Sort always goes one direction only.

**Steps to Reproduce:**
1. Open Orders page
2. Click "Amount" column header — sorts ascending
3. Click "Amount" again — still sorts ascending, not descending

**Expected Behavior:** Second click should sort descending. Toggle between asc/desc on each click.

**File:** `src/app/orders/orders.component.ts` — `sortBy()` method

---

## BUG-007 — Orders search doesn't search by Product or Order ID
**Label:** bug | **Priority:** Medium

**Description:**
The search box on the Orders page only filters by customer name. Searching for a product name or order ID returns no results.

**Steps to Reproduce:**
1. Open Orders page
2. Type "Nike" in the search box — no results shown
3. Type "ORD-001" — no results shown
4. Type "Rahul" — works correctly

**Expected Behavior:** Search should match against customer name, product name, AND order ID.

**File:** `src/app/orders/orders.component.ts` — `applyFilters()` method

---

## BUG-008 — Products category filter shows no results
**Label:** bug | **Priority:** High

**Description:**
Selecting any category from the filter dropdown on the Products page clears all products and shows 0 results, even when products of that category exist.

**Steps to Reproduce:**
1. Open Products page
2. Select "Electronics" from category dropdown
3. All products disappear — shows 0 results

**Expected Behavior:** Should filter and show only products matching the selected category.

**File:** `src/app/products/products.component.ts` — `filterByCategory()` method

---

## BUG-009 — Settings page shows success message on load
**Label:** bug | **Priority:** Low

**Description:**
The "Changes saved successfully!" green banner is visible immediately when the Settings page loads, before the user has done anything.

**Steps to Reproduce:**
1. Navigate to Settings page
2. Success banner visible without saving anything

**Expected Behavior:** Success banner should only appear after the user clicks "Save Profile".

**File:** `src/app/settings/settings.component.ts` — `showSuccessMessage` initial value

---

## BUG-010 — Password form accepts mismatched passwords
**Label:** bug | **Priority:** High

**Description:**
The Change Password form on Settings page submits successfully even when "New Password" and "Confirm Password" fields have different values. No validation error is shown.

**Steps to Reproduce:**
1. Open Settings page
2. Fill Current Password: "password123"
3. Fill New Password: "newpass123"
4. Fill Confirm Password: "differentpass"
5. Click "Change Password" — form submits with no error

**Expected Behavior:** Form should validate that New Password and Confirm Password match. Show error if they don't.

**File:** `src/app/settings/settings.component.ts` — `passwordForm` and `changePassword()` method
