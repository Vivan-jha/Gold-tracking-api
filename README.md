# Gold-tracking-api
The Gold Price Tracking API allows users to track the prices of gold items. It
provides endpoints to retrieve the current and best prices of gold items, update the
price of a specific gold item, and retrieve gold item data based on optional
parameters.
1. Mock Gold Price API Endpoint:
● Endpoint: GET /gold-price
● This endpoint returns a mock gold price by generating a random
number between 0 and 100.
● It simulates fetching the current gold price from an external API or
source.
● The response is a JSON object with the price field representing the
current gold price.
2. Update Gold Item Price API Endpoint:
● Endpoint: PUT /gold-items/:itemId
● This endpoint is used to update the price of a specific gold item.
● It expects the itemId parameter in the URL to identify the gold item to
be updated.
● The request should include the grams parameter in the request body,
representing the new weight of the gold item.
● The API makes a request to the mock Gold Price API to fetch the
current gold price.
● It then calculates the updated price by multiplying the grams with the
current gold price.
● The API updates the price of the specified gold item in the database.
● The response is a JSON object with a message field indicating whether
the gold item price was updated successfully or an error message if
the update failed.
3. Retrieve Gold Item Price API Endpoint:
● Endpoint: GET /gold-items
● This endpoint retrieves the current and best prices of gold items.
● It accepts optional parameters to filter the results:
● itemId: Unique identifier for the gold item. If provided, retrieves
the current and best prices for the specified gold item. If not
provided, retrieves the prices for all gold items.
● timeRange: Specifies the time range (in days) for retrieving the
best price. The default time range is 30 days.
● The API fetches the gold item data from the database using the
fetchCollectionData function.
● It maps the retrieved data to a response format that includes the _id,
price, lastUpdated, and bestPrice fields for each gold item.
● If the timeRange parameter is provided, the API filters the gold items
based on their lastUpdated field within the specified time range.
● The API calculates the bestPrice by finding the maximum price
among the retrieved gold items.
● The response is a JSON object with the goldItems field containing an
array of gold items and the bestPrice field representing the best price.
These are the main functionalities of the Gold Price Tracking API that we have
implemented. The API allows users to update the price of a gold item, retrieve the
current and best prices of gold items, and filter the results based on optional
parameters.
detailed explanation of the API endpoints, their parameters, and responses.
1. Mock Gold Price API Endpoint:
● Endpoint: GET /gold-price
● Parameters: None
● Response: JSON object
● price: The current gold price (randomly generated between 0
and 100).
2. Update Gold Item Price API Endpoint:
● Endpoint: PUT /gold-items/:itemId
● Parameters:
● itemId (in the URL): Unique identifier for the gold item to be
updated.
● Request Body:
● grams: The new weight of the gold item.
● Response: JSON object
● message: Indicates whether the gold item price was updated
successfully.
3. Retrieve Gold Item Price API Endpoint:
● Endpoint: GET /gold-items
● Parameters:
● itemId (optional): Unique identifier for the gold item. If provided,
retrieves the current and best prices for the specified gold item.
If not provided, retrieves the prices for all gold items.
● timeRange (optional): Specifies the time range (in days) for
retrieving the best price. The default time range is 30 days.
● Response: JSON object
● goldItems: An array containing gold item objects with the
following fields:
● _id: Unique identifier for the gold item.
● price: The current price of the gold item.
● lastUpdated: The date and time when the gold item price
was last updated.
● bestPrice: The best price among the gold items (if
applicable).
The API endpoints and their parameters allow users to interact with the Gold Price
Tracking API. The Mock Gold Price API endpoint returns a randomly generated gold
price. The Update Gold Item Price API endpoint updates the price of a specific gold
item based on the provided itemId and grams. The Retrieve Gold Item Price API
endpoint retrieves the current and best prices of gold items, optionally filtered by
itemId and timeRange.
The responses from the API endpoints are JSON objects containing the relevant
data. The Update Gold Item Price endpoint returns a message indicating the success
or failure of the price update. The Retrieve Gold Item Price endpoint returns an array
of gold item objects along with the best price (if applicable) based on the parameters
provided.
Users can make HTTP requests to these API endpoints with the specified
parameters to retrieve and update gold item prices as needed.
how to set up the Gold Price Tracking API using the provided codebase:
1. Receive the Codebase:
● Obtain the entire codebase for the Gold Price Tracking API from a
trusted source (e.g., via file transfer, version control system, or sharing
platform).
2. Environment Setup:
● Install Node.js: Ensure that Node.js is installed on the machine where
you will set up the API. You can download and install Node.js from the
official website: https://nodejs.org
● Install MongoDB: Install MongoDB Community Server on the machine.
You can download and install MongoDB from the official website:
https://www.mongodb.com/try/download/community
3. Project Setup:
● Create a new directory for the project.
● Extract or clone the codebase into the newly created directory.
● Open a command-line interface and navigate to the project directory.
4. Database Setup:
● Import JSON Data: If you have a JSON file containing the gold item
data, copy it to the project directory.
● Import the JSON data into the MongoDB database by running the
following command:
● css
● Copy code
● mongoimport --db gold_prices --collection gold_items --file
<path_to_json_file>
Replace <path_to_json_file> with the actual path to the JSON file
you want to import.
5. Install Dependencies:
● In the command-line interface, run the following command to install the
project's dependencies:
● Copy code
● npm install
6. Configuration:
● Open the project's files in a text editor.
● Locate the configuration section, which may include settings for the
MongoDB connection, port number, or other variables.
● Update the configuration values if necessary, such as the MongoDB
connection URL or authentication credentials.
7. Run the API:
● In the command-line interface, navigate to the project directory if you're
not already there.
● Start the API server by running the following command:
● Copy code
● node index.js
● The server will start running on the specified port (e.g., port 3000) and
display a message indicating that the server is running.
8. Test the API Endpoints:
● Open a web browser or an API testing tool (e.g., Postman).
● Use the appropriate HTTP methods (GET, PUT) and URLs to test the
API endpoints based on their functionality and parameters.
● Refer to the API documentation or the provided instructions for the
specific endpoints, parameters, and responses to perform the desired
tests.
Congratulations! You have successfully set up the Gold Price Tracking API using the
provided codebase. You can now use the API to track gold item prices, update prices,
and retrieve data as needed.
