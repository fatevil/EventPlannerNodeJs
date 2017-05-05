Features:
	Authentication
		- passport LocalStrategy
		- session: jwt token
		- registration
		- login
	Model
		- create Event
		- browsing (upcoming)
			- by location with user's specified radius 
			- see where followed people go
			- attending events 
			- all events
			- all upcoming events
			- hosted events
		- attend / unattend events
		- see other users and their events
		- follow/unfollow other people
	Other features
		- HTTP redirection to HTTPS
		- .env possibility (only specifying ports)



Planned features not implemented:
	- chat 
	- Eventful API


Run:

	npm install
	npm start

using DB: 'meanAuth'

.env options
	- HTTP_PORT
	- HTTPS_PORT


Flaws and future resolutions:
	- run on web server (solve sharp problems)
	- API is not always ready for undefined ids
	- client recieves unneccesary data
		- security flaw
		- network overload
	- update users and events
	- API docs
	- more individual configuration possibilities
		- .end only has port config
	- JWT token authorization string should be hidden from git


---------------------------------------

Week 1
 - setting up project
 - basic user api operation:
	- authentication
 	- login
	- registration
	- session

Week 2
 - Basic operations with Events
 	- read
	- create
	- attend/unattend
 - browsing events based on location
 - following each other

Week 3 
 - user interface
 - chat
 - eventful API
 - tuning