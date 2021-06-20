---
layout: post
title: Developing a SPFX web part to find news images
date: '2017-11-01 23:41:33'
feature_image: '/assets/images/2017/11/news-1172463_1920.jpg'
tags:
- technical
- sharepoint
- sharepoint-framework
- spfx
---

You can read part 1 about [Searching Bing with an Azure Function](Searching Bing with an Azure Function).

Well, it's been a little longer than I'd hoped, partially through business (job, new baby, bla bla bla) but also because in the time I have had, I've been looking at adding some more features as well. These are around adding more image services (Flickr and Pixabay), some more filters so you have some choice around what is displayed and finally saving the image to a site. But first, how was it created.

## Yo SharePoint

The first place to start is creating the framework. Support around this is great, both from the [official docs](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview) and the [PnP Community](https://dev.office.com/pnp). If you prefer a training course, then check out Andrew Connell's [Voitanos](https://www.voitanos.io/) course.

The first step was to be able to show a static image. This is a nice quick change to the main component render method in FindANewsImage.tsx:

    <div className={styles.helloWorld}>
        <div className={styles.container}>
          <div>
            <img data-sp-prop-name="imageSource" src={this.props.imageLocation.ImageUrl} width="100%" />
          </div>
        </div>
      </div>

The imageLocation property is based on an IImage object and is set in FindANewsImageWebPart.ts. Initially, I had this hardcoded and it neatly displayed on the page. However, it would not show the image on the roll-up page. After trying several different things, I eventually found that you needed to set the PreviewImageUrl property. 

    protected get previewImageUrl(): string {
		return this.properties.imageLocation.ThumbnailUrl;
	}

This then showed the thumbnail in any news page roll-up:

![](/assets/images/2017/11/News-rollup.JPG)

The next step was to build out functionality to be able to search for the images. The way that I worked on this was to look at how Olivier Carpentier created custom fields which were used across the amazing SPFX40 examples:

https://github.com/OlivierCC/sp-client-custom-fields.

I used the PropertyFieldColorPicker.ts example and extended it with Office UI Fabric. All the data objects used are defined in IPropertyFieldImagePicker although there is quite a bit of tidy up needed in this. The actual search and rendering of the images takes place in IPropertyFieldImagePickerHost. A search is triggered whenever the text changes in the search box although with a delayed search:

    this.delayedImageSearch = this.async.debounce(this.performSearch, this.props.deferredValidationTime);

The search function uses standard jQuery ajax calls to call the Azure function and return the images that match the query text. You can see an example in the video at the bottom.

    private performSearch(value: string): void {
      let functionUrl = this.props.searchFunctionUrl;
    
      //console.log('Perform search:' + value);
      var timeoutSelf = this;
      setTimeout(function(){
        console.log('timeout set: ' + value);
        var self = timeoutSelf;
        $.ajax({
            url: timeoutSelf.props.searchFunctionUrl + "&query=" +  value + "&pixabay=true&flickr=true",
            method: "GET"
        }).done(function (response) {
            var responseCount = response.length;
            //var response = JSON.parse(data);
            //console.log(response.value);
            self.props.initialValue.ImageUrl = response[0].ImageUrl;


            var oldValue 
            if (self.state && self.state.selectedImage) {
                oldValue = self.state.selectedImage;
            }
            
            self.setState({
                images: response,
                selectedImage: response[0] //default to selected image being the first
            } as IPropertyFieldImagePickerHostState);
            self.props.properties[self.props.targetProperty] = response[0];
            self.props.onPropertyChange(self.props.targetProperty, oldValue, response[0]);
            if (!self.props.disableReactivePropertyChanges && self.props.render != null)
                self.props.render();
                });

        return '';
      }, 1500);
    }

Clicking on the image saves it in to Site Assets and changes the image reference to that. This means that you have local control on the image rather than relying on a link to an external site. It uses blobs to upload the file using direct Javascript:

    private saveImageToSiteAssets(selectedImage: IImage): Promise<IImage> {
      var self = this;
      return new Promise<IImage>(resolve => {

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(){
          if (this.readyState == 4 && this.status == 200){
              //this.response is what you're looking for
              // just my logic to name/create files
              this.response
              var blob = this.response;//new Blob([this.response], { type: 'image/jpeg' });
              var filename = selectedImage.ImageUrl.substr(selectedImage.ImageUrl.lastIndexOf('/') + 1) + '.jpg';
              let web = new Web(self.props.context.pageContext.web.absoluteUrl);
              let siteAssetsFolderPath = self.props.context.pageContext.web.serverRelativeUrl + "/siteassets";
              web.getFolderByServerRelativeUrl(siteAssetsFolderPath).files.addChunked(filename, blob, data => {
                console.log({ data: data, level: LogLevel.Verbose, message: "progress" });
              }, true).then(data => {
                
                let uploadedImage = {
                  ImageId: "",
                  ThumbnailUrl: "",
                  Title: "",
                  ImageUrl: siteAssetsFolderPath + "/" + filename,
                  LicenseDetails: ""
                }; 
                resolve(uploadedImage);
              });
          }
      }
      xhr.open('GET', selectedImage.ImageUrl);
      xhr.responseType = 'blob';
      xhr.send();  

    });
    }
## Demo

<iframe width="560" height="315" src="https://www.youtube.com/embed/VGUBH4fAa_I" frameborder="0" gesture="media" allowfullscreen></iframe>

## So what is next?

My next steps are to add even more providers. Bing, Flickr and Pixabay are currently there but there are a few more providers:

- https://api.everypixel.com/
- https://pixabay.com/api/docs/
- https://unsplash.com/developers
- https://www.pexels.com/api/

Before that, I need to add some filters so that you can choose which providers but also to provide some more checks. For example, some people may be happy to not search for only creative commons image or may want to only view widescreen images. 

Talking of licenses, making sure that this meets most license requirements, I would like it to give the appropriate credits clearly for any images used. This will make it far easier to use images in multiple places and should save these details to the file list too.

There is plenty more to do and that could be done. If you have other ideas or things that you find an issue, please do chat to me on [Twitter](https://twitter.com/kevmcdonk)