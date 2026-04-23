# Analytics Philosophy

We follow the principles popularized by PostHog to define **what to measure** and **how to measure it**.

---

## AI-Assisted Implementation

This analytics system is designed to be **AI-friendly**.

Once your app is running, you can ask your AI assistant to implement analytics automatically. To make this effective, you should provide:

* Your **North Star Metric**
* Your **User Activation criteria**

These require deeper context about your product and cannot be inferred reliably without guidance.

---

## Metric Structure

Every metric must define its events.
* **Dashboards and visualizations are vendor-specific**
---

# Metrics We Track

---

## North Star Metric

The **North Star Metric** represents the core value your product delivers and its closest proxy to revenue.

Examples:

* Uber → Number of rides completed
* Airbnb → Number of bookings

### Event Funnel

Break the North Star Metric into a sequence of events:

Example (Uber):

```
user_created
→ requested_ride
→ accepted_ride
→ picked_up
→ completed_ride
```

This sequence should be visualized as a **funnel**, allowing you to identify drop-off points.

---

## User Activation

**Activation** occurs when a user experiences the core value of your product for the first time.

This is not a superficial action (e.g., signup), but a **meaningful interaction**.

Examples:

* Uber → First ride completed
* PostHog → Viewing 5+ session replays (less than 5 and they deem as not activated)
* Trazo → Uploading a board version

> Note: Activation may include a **threshold** (e.g., “5 actions”) if it better represents value realization.

---

## User Retention

Retention measures whether users **return and continue engaging** after activation.

### How it works

Retention is defined by:

1. **Baseline Event**
   Typically:

   * `user_created`

2. **Return Event**
   Can be:

   * A generic event (e.g., `app_open`, `page_view`)
   * A meaningful action (preferred)

3. **Timeframe**
   Examples:

   * Daily (D1, D7, D30)
   * Weekly
   * Monthly

### Example

* Baseline: `user_created`
* Return event: `completed_ride`
* Timeframe: Monthly

→ Measure how many users complete at least one ride per month after signup.

---

## Revenue

Revenue analytics are handled externally via Stripe.

Stripe already provides:

* Revenue tracking
* Subscription metrics
* Churn and MRR insights

No additional internal tracking is required unless deeper product correlation is needed.

---

## Implementation Notes

* Keep event naming **consistent and explicit**

* Avoid ambiguous events like `clicked_button`

* Prefer **intent-driven naming**:

  * ✅ `ride_requested`
  * ❌ `button_clicked`

* Every tracked event should map to a **business outcome**
