(function(HTML) {
/*
======== A Handy Little QUnit Reference ========
http://api.qunitjs.com/

Test methods:
  module(name, {[setup][ ,teardown]})
  test(name, callback)
  expect(numberOfAssertions)
  stop(increment)
  start(decrement)
Test assertions:
  ok(value, [message])
  equal(actual, expected, [message])
  notEqual(actual, expected, [message])
  deepEqual(actual, expected, [message])
  notDeepEqual(actual, expected, [message])
  strictEqual(actual, expected, [message])
  notStrictEqual(actual, expected, [message])
  throws(block, [expected], [message])
*/

	module("HTML");

	test('HTML', function() {
		ok(HTML, 'HTML should be present');
	});

	test('_', function() {
		ok(HTML._, "HTML._ should be present");
	});

	test('ify', function() {
		var el = document.querySelector('section'),
			els = document.querySelectorAll('div');
		ok(!el.each, 'not HTMLified yet');
		ok(!els.each, 'not HTMLified yet');
		el = HTML.ify(el);
		els = HTML.ify(els);
		ok(el.each, 'HTMLified now');
		ok(els.each, 'HTMLified now');
	});

	test("HTML is the root", function() {
		strictEqual(HTML, document.documentElement, "HTML is the root document element");
	});

	module("traversal");

	test("children", 2, function() {
		ok(HTML.body, "body");
		ok(HTML.head, "head");
	});

	test("single grandkid is HTMLElement", 2, function() {
		ok(HTML.body.section, "got to grandkid");
		ok(HTML.body.section instanceof HTMLElement, "it's an element");
	});

	test("multiple grandkids gets an array", 2, function() {
		ok(HTML.body.section.div, "got multiple");
		ok(HTML.body.section.div instanceof Array, "as an array");
	});

	test("grandkids come descending order", function() {
		var div = HTML.body.section.div;
		ok(div[0].id === "first" && div[div.length - 1].id === "last", "Order is descending");
	});

	module("each()");

	test("for single grandkid", 3, function() {
		var self = HTML.body.section,
		ret = self.each(function(section) {
			ok(section instanceof HTMLElement, "still an element");
			strictEqual(section, self, "is the one we called each() on");
		});
		ok(ret === self, 'returned this');
	});

	test("for multiple grandkids", function() {
		var pdiv, pi = -1,
			self = HTML.body.section.div,
		ret = self.each(function(div, i, arr) {
			notEqual(pdiv, div, 'should have new div');
			strictEqual(i, pi+1, 'index one less');
			ok(arr, 'array as third arg');
			ok(div instanceof HTMLElement, 'have an element');
			pi = i;
			pdiv = div;
		});
		ok(ret === self, 'returned this');
	});

	test("field get", 5, function() {
		var divs = HTML.body.section.div,
			ids = divs.each('id');
		divs.each(function(div, i) {
			strictEqual(div.id, ids[i], "matching id");
		});
	});

	test("field set", 11, function() {
		var divs = HTML.body.section.div,
			ret = divs.each('className', 'foo');
		strictEqual(divs, ret, 'should be same list');
		divs.each(function(div) {
			strictEqual(div.className, 'foo', 'className should be foo');
		});
		divs.each('className', '');
		divs.each(function(div) {
			ok(!div.className, 'className should be empty again');
		});
	});

	test("field function", 7, function() {
		var ends = HTML.find('#first,#last'),
			clones = ends.each('cloneNode');
		notEqual(ends, clones, 'should not return self');
		clones.forEach(function(clone) {
			ok(!clone.parentNode, 'clones have no parents');
		});
		ends.each(function(end, i) {
			strictEqual(end.tagName, clones[i].tagName, 'same tags');
			strictEqual(end.id, clones[i].id, 'same id');
		});
	});

	test("nested field get", function() {
		var divs = HTML.body.section.div,
			strings = divs.each('parentNode.tagName');
		strictEqual(strings.length, divs.length, 'got a parent tag for each div');
		strings = strings.filter(function(s, i){ return strings.indexOf(s) === i; });
		strictEqual(strings.length, 1, 'all have the same parent');
		strictEqual(strings[0], 'SECTION', 'parent tagName is SECTION');
	});

	test("nested field set", function() {
		var first = HTML.find('#first');
		first.each('parentNode.id', 'momma');
		strictEqual(HTML.body.section.id, 'momma');
	});

	test("nested field function with arg", function() {
		var divs = HTML.body.section.div,
			ret = divs.each('classList.add', 'bar');// fails in IE9, i think
		strictEqual(ret, divs, 'should return self');
		divs.each(function(div) {
			strictEqual(div.className, 'bar', 'should have "bar" class');
		});
		divs.each('classList.remove','bar');
	});

	test("field value/argument index replacement", 6, function() {
		var divs = HTML.body.section.div,
			ret = divs.each('textContent', '#${i} is what it is');
		strictEqual(ret, divs, 'should return self');
		divs.each(function(div, i) {
			strictEqual(div.textContent, '#'+i+' is what it is', 'text should include proper index');
		});
		divs.each('textContent', '');
	});

	test("field value/argument function", 21, function() {
		var divs = HTML.body.section.div,
			fn = function(el, i, args) {
				if (args) {
					ok('nodeType' in el, 'got node as first argument');
					ok(typeof i === "number", 'got index as second argument');
					deepEqual(args, [fn], 'third argument is array containing this function');
				}
				return '#'+i+' has id: '+el.id;
			},
			ret = divs.each('textContent', fn);
		strictEqual(ret, divs, 'should return self');
		divs.each(function(div, i) {
			strictEqual(div.textContent, fn(div, i), 'text content has text made from index and an element property');
		});
		divs.each('textContent', '');
	});

	test("aliased field", function() {
		HTML._.field['-class'] = 'classList.remove';
		var divs = HTML.body.section.div.each('classList.add','bar');
		divs.each(function(el) {
			ok(el.className.indexOf('bar') >= 0, 'have class bar');
		});
		var	ret = divs.each('-class', 'bar');
		strictEqual(ret, divs, 'should return self');
		divs.each(function(el) {
			ok(el.className.indexOf('bar') < 0, 'don\'t have class bar');
		});
	});

	module("only()");

	test("by slice, on one", function() {
		var section = HTML.body.section;
		strictEqual(section.only(0), section, "self for 0");
		ok(!section.only(1).length, 'empty array for bad index');
	});

	test("by selector, on one", function() {
		var section = HTML.body.section;
		strictEqual(section.only('.foo'), section, "self for .foo");
		ok(!section.only('#first').length, 'empty array for non-matching selector');
	});

	test("by function, on one", function() {
		var section = HTML.body.section;
		strictEqual(section.only(function(el) {
			return el.tagName === 'SECTION';
		}), section, "self when tagName is SECTION");
	});

	test("by slice, on multiple", function() {
		var divs = HTML.body.section.div;
		strictEqual(divs.only(-1), divs[divs.length-1], 'get last one');
		strictEqual(divs.only(1,4).length, 3, "got sublist of proper length");
	});

	test("by selector, on multiple", function() {
		var divs = HTML.body.section.div;
		strictEqual(divs.only('#first'), HTML.find('#first'), 'got #first');
	});

	test("by function, on multiple", function() {
		var odds = function(n,i){ return i%2; };
		strictEqual(HTML.body.section.div.only(odds).length, 2, "got two odd divs");
	});


	module("search");

	test("find multiple, get array", function() {
		ok(HTML.find("div") instanceof Array, "should be an array");
	});

	test("find one, get HTMLElement", function() {
		ok(HTML.find("#identity") instanceof HTMLElement, "should be an element");
	});

	test("find nonexistent, get empty array", function() {
		ok(!HTML.find("#idontexist").length, "empty array");
	});

	test("contextual search", function() {
		strictEqual(HTML.body.section.find("div").length, 5, "should be five divs, not seven");
	});

	test("traverse on result", function() {
		ok(HTML);
		ok(HTML.find('section'));
		ok(HTML.find("section").div, "should be present");
	});

}(HTML));

