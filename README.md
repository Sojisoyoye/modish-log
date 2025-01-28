# modish-log

MODISH LOG/INVENTORY

Run the following command in the root directory:


docker-compose up --build

Backend: http://localhost:3000

Frontend: http://localhost:3001



# modish-inventory

Create history to show sales date change in stock and all
validate that sale quantity can not be zero
validate that negative value can not be entered for create sale and product
validate that negative value can not be entered for update product

## User

- User can create/add sale ✅
- User can get all sales ✅
- User can get a sale ✅
- User can edit sale 🚫
- User can delete sale 🚫
- User can see sale history of a product
- User can see all products with just quantity left column alone
- User can see a product with just quantity left column alone

## Admin

- Admin can create/add product ✅
- Admin can get a product ✅
- Admin can get all products ✅
- Admin can edit product
  - can add quantities to existing product
- Admin can delete product

## User Auth

- Admin can create a user
- Admin can get users
- Admin can get a user
- Admin can delete/deactivate user
- User can login
- User can log out
- User can reset password
