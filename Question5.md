Answer to number 5)

To answer the first part, I'm going to make the assumption that since the response already contains 10000 fields, we are handling this all client-side. 

My first instinct is client-side pagination, which we can do by generating all the pages as soon as the response resolves or we can cache it client side and paginate as the user navigates (by scroll or click).

Without caching, we would need to generate DOM page objects and render them asynchronously so the UI does not feel latent.  Fully paginating initially would work, but as the data becomes increasingly more robust, we run the risk of client-side latency. Although, since the structure of the data is uniform, creating a row or list-item for each object is computationally inexpensive. This is definitely an option.

If we decide to cache it and hold on to it, we need to consider a few things: size, structure, security. 

- The data is too large for sessions so we can rule that out.

- Web Storage - This solution is reliable and can handle a fairly large load. Being an unstructured storage system however, would lose the ability for us to access it by index, unless we structured the keys in a way that mimicked our pagination. Although it's synchronicity makes me question whether this is a valid option, but I'm not ruling it out. It's easy to use and our data is not complex by any means.

- WebSQL is becoming deprecated and requires an initial schema to be instantiated, but that could offer some fast filtering and analytics functionality. Being asynchronous and indexed definitely scores it some points in terms of performance.

- IndexedDB gives a lot of functionality, is asynchronous and indexed, which will minimize the risk of locking up our UI. Both this and WebSQL are valid performance options, but might be overkill considering the data's uniformity.

- There are some hybrid options: Firefox has localforage, which utilizes the latter 3 technologies to deliver some powerful functionality.

VDB - All of the previous options are valid, but might not be the most secure. If a user's data is stored client-side, we run the risk of someone else gaining access. It's one thing to store a shopping cart, it's another to store sensitive information. I honestly don't think any client-side storage is an option for this. If I had to deal with this response purely on the front end, I would render it all at once (asynchronous pagination) and not store it anywhere or I would create a VDB instance that can be accessed quickly and is more secure (Firebase is lightning fast, and AWS elasticache might serve as well). Ultimately, I think the issue needs to be solved on the server-side.

To answer the second part - we don't send 10000 objects at once. Server side pagination seems like the most valid option. A simple solution is to send back x amount along with a pagination url that gets the next x amount. Large amounts of data should be paginated server side and a count value should accompany requests. This would reduce the size of the load delivered and cut the costs associated with sending data over the wire. Cache-control can also be implemented server side, which would significantly reduce the risks of scripting attacks client-side if the decision is made to store the load on the front end.

I think the best solution is to modify how both the front and back deal with the data. Implement a count in the request, use VDB caching (maybe a redis instance for the user session) or use cache-control, and paginate on both sides. Having the user access a cache would risk delivering obsoleted information, so attaching a key to check if anything has been updated before accessing cache would also be an improvement.
