CCTV Gimmick
============

Adds a CCTV camera that pans as the users scrolls and 'records' when the user is active by a flashing red light. If a user tries to right click on the camera, they will be locked out of the website and need to enter a code!

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="../js/jquery.cctv.min.js"></script>
	```
3. Include the CSS:

	```html
	<link href='../css/cctv.css' rel='stylesheet' type='text/css'>
	```
4. Include the element

	```html
	<div id="cctv"></div>
	```		
5. Call the plugin:

	```javascript
	$(function() {
		$("#cctv").cctv({
			code:12345,
			lockout: true
		});
	});
	```
	
## Structure

The basic structure of the project is given in the following way:

```
├── demo/
│   └── index.html
├── css/
│   ├── cctv.scss
│   ├── mixins.scss
│   └── cctv.css
├── js/
│   ├── jquery.cctv.js
│   └── jquery.cctv.min.js
├── images/
├── .gitignore




## License

[MIT License](http://zenorocha.mit-license.org/)


