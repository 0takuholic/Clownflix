const cheerio = require("cheerio");
const axios = require("axios");

function axiosget(webtarget) {
	pain = axios.get(webtarget).then((res) => {
		return res.data;
	});
	return pain
};

window.axiosget = axiosget;

function getimages(webtarget) {
	const animain = cheerio.load(webtarget);

	const images = [];
	animain('img').each(function(i, elem) {
		images[i] = animain(this).attr("src");
	});
	return images;
};

function getalts(webtarget) {
	const animain = cheerio.load(webtarget);

	const images = [];
	animain('img').each(function(i, elem) {
		images[i] = animain(this).attr("alt");
	});
	return images;
};

window.getalts = getalts;

window.getimages = getimages;

function getactive(webtarget) {
	const animain = cheerio.load(webtarget);

	const images = [];
	animain('.active').each(function(i, elem) {
		images[i] = animain(this);
	});
	console.log(images);
	return images;
};

window.getactive = getactive;

function getclass(webtarget, classname) {
	const animain = cheerio.load(webtarget);

	const images = [];
	animain('.' + classname).each(function(i, elem) {
		images[i] = animain(this);
	});
	return images;
};

window.getclass = getclass;

function gettag(webtarget, tag) {
	const animain = cheerio.load(webtarget);

	const images = [];
	animain(tag).each(function(i, elem) {
		images[i] = animain(this);
	});
	return images;
};

window.gettag = gettag;



function getid(webtarget, targetwanted) {
	const animain = cheerio.load(webtarget);

	const images = [];
	animain('#' + targetwanted).each(function(i, elem) {
		images[i] = animain(this);
	});
	return images;
};


window.getid = getid;


function getlinks(webtarget) {
	const animain = cheerio.load(webtarget);

	const links = [];
	animain('a').each(function(i, elem) {
		links[i] = animain(this).attr("href");
	});
	return links;
};


window.getlinks = getlinks;


function gogoseries(webtarget) {
	const animain = cheerio.load(webtarget);

	const links = new Map();
	animain('a').each(function(i, elem) {
		if(animain(this).attr("href").startsWith("/category/"))
			links[animain(this).attr("title")] = animain(this).attr("href");
	});
	return links;
};


window.gogoseries = gogoseries;


function getstring(webtarget, tag) {
	const animain = cheerio.load(webtarget);

	const images = [];
	animain(tag).each(function(i, elem) {
		images[i] = animain(this).text();
	});
	return images;
};

window.getstring = getstring;

function gogosummary(webtarget) {
	const animain = cheerio.load(webtarget);
	summaryparent = animain(".type").prevAll(".type").first().next().last();
	return summaryparent;
};

window.gogosummary = gogosummary;

function gogogenres(webtarget) {
	const animain = cheerio.load(webtarget);
	summaryparent = animain(".type").prevAll(".type").first().next().siblings().next().siblings().next().last();
	var i
	genres = []
	for (i = 1; i < summaryparent.children().length; i++) {
		genres[i] = summaryparent.children().toArray()[i]['attribs']['title'];
	}
	return genres
};


window.gogogenres = gogogenres;


function gogonames(webtarget) {
	const animain = cheerio.load(webtarget);
	summaryparent = summaryparent = animain(".type").prevAll(".type").first().nextAll().toArray()[1].children[1]["data"];
	return summaryparent
};

window.gogonames = gogonames;


function gogostatus(webtarget) {
	const animain = cheerio.load(webtarget);
	summaryparent =  animain(".type").prevAll(".type").last()["prevObject"][4]["next"]["next"].children[1]['data'];
	return summaryparent
};

window.gogostatus = gogostatus;


function gogoepisodes(webtarget) {
	const animain = cheerio.load(webtarget);
	var proxy = new Proxy(animain("#episode_page").last()[0].children, {
		get(target, prop) {
			if (!isNaN(prop)) {
				prop = parseInt(prop, 10); //whats parse int??
				if (prop < 0) {
					prop += target.length;
				}
			}
			return target[prop]
		}
	});
	summaryparent = proxy[-2].children
	proxy = new Proxy(summaryparent, {
		get(target, prop) {
			if (!isNaN(prop)) {
				prop = parseInt(prop, 10); //whats parse int??
				if (prop < 0) {
					prop += target.length;
				}
			}
			return target[prop]
		}
	});
	summaryparent = proxy[-2]['attribs']['ep_end']
	return summaryparent
};

window.gogoepisodes = gogoepisodes;

function getvideo(webtarget) {
	const animain = cheerio.load(webtarget);

	//console.log(animain(".active").nextAll()["prevObject"][0]["attribs"]["data-video"])
	return animain(".active").nextAll()["prevObject"][0]["attribs"]["data-video"];
}

window.getvideo = getvideo;