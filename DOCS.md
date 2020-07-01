# Mamakitchen
Mamakitchen wants to be a meals marketplace open to every chef that wants to sell his food.
Through the platform every Chef is able to show his personal selection of meals and let the user place his order.

## For Chefs:
- Login
  - new Kitchen OR edit Kitchen <-- same component, prefilled with kitchen data if present
    - add/modify kitchen description (see ## Kitchen page)
    - add/modify new dishes (i.e. todolist)
      - a/m image
      - a/m name
      - a/m description
      - a/m max quantity
    - define/modify availability

## Unlogged users:
- see a list of kitchens;
- select a kitchen:
  - see the list of meals available
  - place an order:
    - define quantity and mealtime
    - proceed to checkout

## Kitchen page
Every chef owns a kitchen.
The main informations regarding each kitchen are:
- Address
- general description
- list of meals
- about the Chef
