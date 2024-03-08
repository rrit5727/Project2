
 # Shopping list + chores app 
 * This app lets you keep track of groceries and other household items and their states of depletion 
 * It also allows you to add chores to which groceries/items can be linked 
 * You can update an item as it is used to track its quantity/depletion 
 - A shopping list can be generated if the item's quantity is less than 40%
 - Similarly, if you have run out of an item a list of impacted chores can be generated


## Screenshots 
### Item index
![Item index screen](Readme_images/Item-list.png)


## Technologies Used 
* JavaScript
* HTML 
* CSS
* Express
* MongDB
* Mongoose
* Google 0Auth
* Passport

## Getting Started 
# Standard functionality
* App not yet deployed - start-up on computer in the meantime
* Login using Google Oauth
* Add an item by selecting the 'add item' link in the nav bar
* fill in the name, availability and quantity fields
* Select add item
* Add a chore by selecting the 'add chore' link in the nav bar
* Input the chore name and add the chore
* Navigate to the 'all items' page using the nav bar
* Item can be linked to a chore using the drop down menu - select 'add to chore' once chore selected
* Select an item by clicking on the item name to update
- Item details can then be manipulated 
* Select a chore by clicking on the chore name
- This will show a list of the items used in that chore and the quantity of each item

## Special purpose functionality
### Shopping list
* Try updating an item's quantity to '0' or '1'
* Then navigate to the 'all items' page
* Click 'generate shopping list'

### Impacted chores list
* Navigate to the 'all chores' page (once an item has been updated to '0' quantity)
* Click 'Impacted chores list' 

## Next steps
* Update styling
* Add more user-centric functionality for items and chores
- I.e. make it so that items/chores are only displayed for users that created them
