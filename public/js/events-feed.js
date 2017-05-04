/* Template for carousel page*/
const templateCarouselImage = (src, title, quick, id) => {
    return `
                <div class="col-xs-4">                   
                        <div class="imageDiv">  
                            <a href="/event_new.html?_id=${id}">
                                <img src="${src}" alt="Image" class="img-responsive">
                                <div class="col-sm-12  caption post-content">
                                    <div class="text-center">
                                        <h3 style="margin-top:10px;"><p class="">${title}</p></h3>
                                        
                                    </div>
                                </div>
                            </a>
                        </div>                        
                    </div>
                    `;
};

/* Template for item in slider - active one*/
const templateCarouselForm = (id, type) => {
    return `
        <div class="item">
            <div id="carousel-form-${type}-${id}" class="row">
            </div>
        </div>
            `;
};

/* Template for item in slider - active one*/
const templateCarouselFormFirst = (id, type) => {
    return `
        <div class="item active">
            <div id="carousel-form-${type}-${id}" class="row">
            </div>
        </div>
            `;
}

/**
 *  Fill slider with images and links.
 */
const fillCarousel = (category, i, event) => {
    if (!event.image) {
        return;
    }
    let o = Math.floor(i / 3);
    if (i % 3 == 0) {
        if (o == 0) {
            $('#itemsDiv' + category).append(templateCarouselFormFirst(o, category));
        } else {
            $('#itemsDiv' + category).append(templateCarouselForm(o, category));
        }
    }
    const item = `#carousel-form-${category}-${o}`;
    $(item).append(templateCarouselImage(event.image.replace("images/", "images/cropped/"), event.title, event.quick_description, event._id));
};

/* fetch events based on who you follow*/
fetchFriendsEvents()
    .then(function(res) {
        let friendsIndex = 0;
        res.forEach((event) => {
            $('#friendsEventsDiv').prepend(`${event.title} <a href="/event_new.html?_id=${event._id}">link</a> <br>`);

            fillCarousel('Friends', friendsIndex, event);
            if (event.image) {
                friendsIndex++;
            }
        });
    })
    .catch(function(err) {
        console.log(err);
    });
/* end of fecthing events based on followed*/

/* fetch events by location from API and display events by category */
fetchEventsByLocation()
    .then(function(res) {
        //console.log(res);

        let foodIndex = 0;
        let showsIndex = 0;
        let othersIndex = 0;
        res.forEach((event) => {

            $('#eventsByLocationDiv').prepend(`${event.title} <a href="/event_new.html?_id=${event._id}">link</a> <br>`);
            if (event.category == 'Food') {
                fillCarousel('Food', foodIndex, event);
                foodIndex++;
            } else if (event.category == 'Show') {
                fillCarousel('Show', showsIndex, event);
                showsIndex++;
            } else {
                fillCarousel('Others', othersIndex, event);
                othersIndex++;
            }
        });
    })
    .catch(function(err) {
        console.log(err);
    });
/* end of fetching events by location*/


/* Setup carousels*/
$('#myCarouselFood').carousel({ interval: 10000 });
$('#myCarouselFood').on('slid.bs.carousel', function() {});
$('#myCarouselShow').carousel({ interval: 10000 });
$('#myCarouselShow').on('slid.bs.carousel', function() {});
$('#myCarouselOthers').carousel({ interval: 10000 });
$('#myCarouselOthers').on('slid.bs.carousel', function() {});
$('#myCarouselFriends').carousel({ interval: 10000 });
$('#myCarouselFriends').on('slid.bs.carousel', function() {});
/* end of setup of carousels */