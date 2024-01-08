
const puppeteer = require('puppeteer');

async function getPics(movieName) {
    
    let linksOfImages = [];
    const browser = await puppeteer.launch({ headless: false });
  

  try{

    const page = await browser.newPage();

    await page.goto('https://www.imdb.com/?ref_=nv_home');

    await page.type('#suggestion-search', movieName);

    await page.click('#suggestion-search-button');
    await page.waitForNavigation();
    await page.click('.ipc-metadata-list-summary-item__tc a');
    await page.waitForNavigation();

    const picturePageLink = await page.evaluate(() => {
      const item = document.querySelectorAll(".sc-e226b0e3-9.bkRdrN .ipc-btn.ipc-btn--single-padding.ipc-btn--center-align-content.ipc-btn--default-height.ipc-btn--core-baseAlt.ipc-btn--theme-baseAlt.ipc-btn--on-onBase.ipc-secondary-button.sc-a5dc65fa-3.vpjOB");
      return item[1].href;
    })

    await page.goto(picturePageLink);

    await page.click('.ipc-icon-link.ipc-icon-link--baseAlt.ipc-icon-link--onBase');

    await page.waitForNavigation();

    // get total number of pages to handle pagination
    let totalPages;
  
      totalPages = await page.evaluate(() => {
        const noOfPages = document.querySelectorAll('#right .page_list a');
         
       
       if((typeof(noOfPages)==='object') && noOfPages.length>0 )   
          return parseInt(noOfPages[noOfPages.length - 1].innerText);
        
            
        return 0;
      });

      
      if(totalPages<1){
          const data = await page.$$eval('#media_index_thumbnail_grid img',(links =>{
            const replacementText = "_FMjpg_UX2160_.jpg";
            return links.map(link => link.src.replace(/(_V1).*\.jpg$/, `$1${replacementText}`));   
          }))
        await browser.close();
        return data;
      }



    let pageUrl = await page.url();
    pageUrl = pageUrl.replace(/(\?)(.*)(ref_)/, `$1page=${1}&$2$3`);

      for (let i = 2; i <= totalPages + 1; i++) {

        await page.goto(pageUrl);
        console.log(pageUrl)

        linksOfImages = linksOfImages.concat(await page.$$eval('#media_index_thumbnail_grid img', (links => {
          const replacementText = "_FMjpg_UX2160_.jpg";
          return links.map(link => link.src.replace(/(_V1).*\.jpg$/, `$1${replacementText}`));
        })))

        pageUrl = pageUrl.replace(`page=${i - 1}`, `page=${i}`);

      }
    
    await browser.close();
    return linksOfImages;
    
  }catch(err){

    console.log("Process has been interrupted ",err)  
    await browser.close()
      return linksOfImages;
    
    }


}


module.exports = {
  getPics
}


