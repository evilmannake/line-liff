# To run the project

```
docker-compose up -d
```

Then, open a browser and navigate to

```
localhost:3000
```

# Pre-assumptions I made

To simplify the use case and to make coding less complicated, I assumes that

- When placing orders, customer is already authenticated.

No matter how many orders placed, it will come from the same customer.
So that I can push notification to the customer without having to do authentication just to differentiate each customer's request.

# Answer

I pick Nodejs because the project doesn't require doing any performance intensive operations on the backend.
Tasks are about handling HTTP requests, responding to events, and communicating with external services.
Nodejs is excellent at dealing with asynchronous tasks.

C# (.NET) is also a good alternative for handling asynchronous tasks.
It is a compiled language that offers strongly typed OOP.
The performance is on par with Nodejs.
Unlike .NET, Nodejs doesn't have type-checking feature.
Typescript, an extension language to javascript, offers a type-checking and can run inside Nodejs by transpiling the code to javascript.

Both of these languages are suitable for the project.
Though, .NET is a little more cumbersome to deploy than Nodejs because it has to run on a Windows server (IIS).

Nodejs is what I am comfortable with.
Therefore, it is the language that I choose to implement in this project.

## What about database ?

From a specification that I read, there are two entities.

- Product
- Order

Order can contain product(s).
However the product is not a `Product` entity.
It is a snapshot of `Product`.
If products are updated or deleted, orders that have those products shouldn't be updated along with.
Order should contain the history of products ordered, not the `Product` entity itself.
`Product` and `Order` have no relationship with each other.

There are two choices when it comes to choosing a database

- Relational database

Suitable for data that have simple relationships, table-like structure, requires integrity, and strict validation.

- Non-relational database

Suitable for data with little to no relationships with other entities, soft validation, and having a predefined schema upfront is not necessary.

Graph database is also a part of Non-relational database. It is suitable for data with complex relationships between entities.
Relationships have main priority over entity.

As stated about `Product` and `Order` entities, there is no relationship between them.
A non-relational database is suitable for the project.
Order that can contain product snapshots means that I need a database which is suitable for embedding object-like data into the entity.
I found that MongoDB is what I am looking for.
MongoDB represents stored data in JSON.
Because of flexible schema, I can insert any extra product information to `Order` without having to define a model about it.
They are rarely updated anyway so it shouldn't be a problem in long term.
