/*滑动门 插件*/
$(function(a){
    var imgpreload= function(g, f, d) {
        var b = 0;
        var a = [];
        g = Object.prototype.toString.apply(g) === "[object Array]" ? g : [g];
        var e = function() {
                b += 1;
                if (b === g.length && f) {
                    f(a, d)
                }
            };
        for (var c = 0; c < g.length; c++) {
            a[c] = new Image();
            a[c].onabort = e;
            a[c].onerror = e;
            a[c].onload = e;
            a[c].src = g[c]
        }
    }
  
	a("div.hp07v0").each(function(f) {
		var d = a(this);
		var c = (d.hasClass("hp07random")) ? Math.floor(Math.random() * (d.find("div.hp07").length - 1 + 1)) + 1 : 1;
		d[0].current = c;
      
        d.append('<div class="hp07z1"></div>').append('<div class="hp07z2"></div>');

		d.find("div.hp07").each(function(i) {
			if (i == (d[0].current - 1)) {
				a(this).addClass("cfeature");
				var h = (a(this).is("[data-bgimg]")) ? b(a(this).attr("data-bgimg")) : "ffffff";
                var imgurl = a(this).attr("data-imgurl") || "javascript:void(0)";
				var g = ((a(this).is("[data-bgimg2x]") && a("html").hasClass("retina") && a(window).width() > 600)) ? a(this).attr("data-bgimg2x") : a(this).attr("data-bgimg");
				d.append('<div class="hp07w4"><div class="hp07imgslide cslide" id="hp07img-' + (i + 1) + '"><div style="background-color:#' + h + '"><a href="'+imgurl+'" target="_blank"><img class="hp07img" src="' + g + '"></a></div></div></div>');
				var g = a(this).attr("data-bgimg");
				imgpreload([g], function(j, k) {
					var l = k.find("div.hp07w4");
					k.find("div.hp07").each(function(p) {
						if (p != (d[0].current - 1)) {
							var o = (a(this).is("[data-bgimg]")) ? b(a(this).attr("data-bgimg")) : "ffffff";
							var m = ((a(this).is("[data-bgimg2x]") && a("html").hasClass("retina") && a(window).width() > 600)) ? a(this).attr("data-bgimg2x") : a(this).attr("data-bgimg");
                            var imgurl2 = a(this).attr("data-imgurl") || "javascript:void(0)";
							if (p < (d[0].current - 1)) {
								l.find("#hp07img-" + d[0].current).before('<div class="hp07imgslide" id="hp07img-' + (p + 1) + '"><div style="background-color:#' + o + '"><a href="'+imgurl2+'" target="_blank"><img class="hp07img" src="' + m + '"></a></div></div>')
							} else {
								l.append('<div class="hp07imgslide" id="hp07img-' + (p + 1) + '"><div style="background-color:#' + o + '"><a href="'+imgurl2+'" target="_blank"><img class="hp07img" src="' + m + '"></a></div></div>')
							}
						}
					})
				}, a(this).closest("div.hp07v0"))
			}
			a(this).attr("data-lbl", "hpf" + (i + 1));
			if (!a(this).find(".hp07w3").first().is("[data-lbl]")) {
				a(this).find(".hp07w3").attr("data-lbl", a(this).find(".hp07ttl").text())
			}
		});
      
		if (d.find("div.hp07").length > 1) {
/*var e = '<div class="hp07nav"><ul style="margin-top:-' + (((d.find("div.hp07").length * 1.375 ) / 2)- 1.325)  + "em;*margin-top:-36.78px;*/   /*在这 修改 高度。按照 居中计算即可*/
            var e = '<div class="hp07nav"><ul style="margin-top:-' + 57+ "px;margin-left:-" + (((d.find("div.hp07").length * 1.05) / 2) + 0.15) + 'em">';
			d.find("div.hp07").each(function(h) {
				a(this).attr("id", "feature-" + (h + 1));
				var g = (h == (d[0].current - 1)) ? ' class="hp07selected"' : "";
				e += '<li><a href="#feature-' + (h + 1) + '"' + g + ' id="fnav-' + (h + 1) + '" data-goto="' + (h + 1) + '"> </a></li>'
			});
			e += "</ul></div>";
//			d.find(".hp07w2").append(e + '\n<a href="#next" class="hp07dnav hp07next" data-goto="+1"><i> </i></a>')
//			d.find(".hp07w2").append(e)  //原来是放在这的
			d.find(".hp07w4").append(e)
		} else {
			d.find("div.hp07").first().attr("id", "feature-" + (d[0].current));
			d.addClass("hp07single")
		}
      
		a("#feature-" + (d[0].current)).css("top", 0).css("left", 0);
		a("#hp07img-" + (d[0].current)).css("top", 0).css("left", 0);

		function b(g) {
			if (/-bg(......)-/.test(g)) {
				var h = g.replace(/.*-bg(......).*/ig, "$1");
				return h
			} else {
				return "ffffff"
			}
		}
	});
	a("body").on("mouseenter", "#hp07v0", function() {
		a(this).addClass("hp07pause")
	}).on("mouseleave", "#hp07v0", function() {
		a(this).removeClass("hp07pause")
	})
    
    $(document).on("click", "a.hp07dnav,.hp07nav a", function() {
      if (!$(".hp07busy")[0] && !$(this).hasClass("hp07selected")) {
          if (/[-+]/.test($(this).attr("data-goto"))) {
              var a = ($(this).attr("data-goto").indexOf("+") > -1) ? "next" : "prev";
              hp07goto($(this).attr("data-goto"), a)
          } else {
              hp07goto(($(this).attr("data-goto") * 1), "nav")
          }
      }
      return false
  });
  
})
function hp07goto(k, l) {
	var i = $("div.hp07v0").first();
	if (l == "auto" && i.hasClass("hp07gonemanual")) {
        setTimeout(function() {
            i.removeClass("hp07gonemanual");
				hp07goto("+1", "auto");
			}, i.attr("data-hp07rotate") * 200);
		return
	} else {
		if (l == "auto" && i.hasClass("hp07pause")) {
			setTimeout(function() {
				hp07goto("+1", "auto")
			}, i.attr("data-hp07rotate") * 1000);
			return
		}
	}
	i.addClass("hp07busy");
	if (l != "auto") {
		i.addClass("hp07gonemanual")
	}
	var o = i[0].current;
	var d = i.find("div.hp07").length;
	var j = ((o - 1) == 0) ? d : (o - 1);
	var c = ((o + 1) > d) ? 1 : (o + 1);
	var e = null;
	if (/[+]/.test(k)) {
		k = c;
		e = "n"
	} else {
		if (/[-]/.test(k)) {
			k = j;
			e = "p"
		}
	}
	$(".hp07dnav").animate({
		opacity: "0"
	}, 300, "easeInOutSine");
	$(".hp07selected").removeClass("hp07selected");
	$("#fnav-" + k).addClass("hp07selected");
	var m = "-100%";
	var f = "-80%";
	var g = "100%";
	var h = "-20%";
	var b = "20%";
	if ((k > o && o != d && e != "p") || e == "n") {
		m = "100%";
		f = "80%";
		g = "-100%";
		h = "20%";
		b = "-20%"
	}
	var a = $("#feature-" + k).find(".hp07w3").attr("data-lbl");
	a = a.toLowerCase().replace(/ /g, "-").replace(/\xa0/g, "-").replace(/-+/g, "-").replace(/[.,:;'"]/g, "");
	if (!i[0].autocount) {
		i[0].autocount = 2
	} else {
		if (!i.hasClass("hp07gonemanual")) {
			i[0].autocount = i[0].autocount + 1
		} else {
			i[0].autocount = 0
		}
	}
	if (typeof navTrack == "function" && typeof s_setAccount == "function" && i[0].autocount <= i.find(".hp07v1").length) {
		navTrack(s_setAccount()[1], s_setAccount()[2], "hp07", "show-hpf" + k + ":" + a + ":" + l)
	}
	var n = (i.width() < 620) ? 600 : 1000;
	if (!document.addEventListener) {
		$("#feature-" + k).addClass("cfeature");
		$("#feature-" + k).css("top", m);
		$("#hp07img-" + k).css("top", "0").css("left", "0").css("z-index", "1");
		$("#hp07img-" + k + " div").css("top", h);
		$("#hp07img-" + k).addClass("cslide");
		$("#hp07img-" + o).css("z-index", "2");
		$("#feature-" + o).animate({
			top: g
		}, n, "easeInOutSine");
		$("#hp07img-" + o + " div").animate({
			top: f
		}, n, "easeInOutSine");
		$("#hp07img-" + o).animate({
			top: g
		}, n, "easeInOutSine", function() {
			$(this).css("top", g);
			$("#feature-" + o).removeClass("cfeature");
			$("#hp07img-" + o).removeClass("cslide");
			if (l == "auto") {
				setTimeout(function() {
					hp07goto("+1", "auto")
				}, i.attr("data-hp07rotate") * 1000)
			}
		});
		$("#hp07img-" + k + " div").animate({
			top: "0"
		}, n, "easeInOutSine");
		$("#hp07img-" + k).animate({
			top: "0"
		}, n, "easeInOutSine");
		$("#feature-" + k).animate({
			top: "0%"
		}, n, "easeInOutSine", function() {
			$(".hp07dnav").animate({
				opacity: "1"
			}, 150, "easeInOutSine");
			$(".hp07busy").removeClass("hp07busy")
		})
	} else {
		$("#feature-" + k).addClass("cfeature");
		$("#feature-" + k).css("top", m).css("left", m);
		$("#hp07img-" + k).css("top", "0%").css("left", "0%").css("z-index", "0");
		$("#hp07img-" + k).addClass("cslide");
		$("#hp07img-" + k + " div").css("top", h).css("left", h);
		$("#hp07img-" + o).css("z-index", "2");
		$("#feature-" + o).animate({
			top: g,
			left: g
		}, n, "easeInOutSine");
		$("#hp07img-" + o + " div").animate({
			top: f,
			left: f
		}, n, "easeInOutSine");
		$("#hp07img-" + o).animate({
			top: g,
			left: g
		}, n, "easeInOutSine", function() {
			$(this).css("top", g).css("left", g);
			$("#feature-" + o).removeClass("cfeature");
			$("#hp07img-" + o).removeClass("cslide");
			if (l == "auto") {
				setTimeout(function() {
					hp07goto("+1", "auto")
				}, i.attr("data-hp07rotate") * 1000)
			}
		});
		$("#hp07img-" + k + " div").animate({
			top: "0",
			left: "0"
		}, n, "easeInOutSine");
		$("#hp07img-" + k).animate({
			top: "0",
			left: "0"
		}, n, "easeInOutSine");
		$("#feature-" + k).animate({
			top: "0%",
			left: "0%"
		}, n, "easeInOutSine", function() {
			$(".hp07dnav").animate({
				opacity: "1"
			}, 150, "easeInOutSine");
			$(".hp07busy").removeClass("hp07busy")
		})
	}
	i[0].current = k;
	if (l != "auto") {
		i.addClass("hp07gonemanual")
	}
}
$(window).load(function() {
	var a = ($("#hp07v0").is("[data-hp07rotate]")) ? $("#hp07v0").attr("data-hp07rotate") : 6;
	$("#hp07v0").attr("data-hp07rotate", a);
	if (a != 0 && !$("#hp07v0").hasClass("hp07single")) {
		setTimeout(function() {
			hp07goto("+1", "auto")
		}, a * 1000)
	}
//	var b = $("#feature-" + ($("div.hp07v0").first()[0].current)).find(".hp07w3").attr("data-lbl");
//	b = b.toLowerCase().replace(/ /g, "-").replace(/\xa0/g, "-").replace(/-+/g, "-").replace(/[.,:;'"]/g, "");
	if (typeof navTrack == "function" && typeof s_setAccount == "function") {
		navTrack(s_setAccount()[1], s_setAccount()[2], "hp07", "show-hpf1:" + b + ":load")
	}
});