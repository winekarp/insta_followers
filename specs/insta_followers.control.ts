import { InstaFollowersPage } from './insta_followers.page';
import { ElementHelper } from './element.helper';

export class InstaFollowersControl {

    static async login(login_name, password) {
        // navigate Instagram login page
        // set the credentials
        // redirected to Home page as the signed in user

        await browser.url(`https://www.instagram.com/`);
        await ElementHelper.waitForDisplayed(await InstaFollowersPage.prototype.instagram_home_page);
        await browser.pause(5000);

        if (await (await InstaFollowersPage.prototype.allow_cookies_btn).isDisplayed()) {
            await ElementHelper.click(await InstaFollowersPage.prototype.allow_cookies_btn);
            await browser.pause(3000);
        }

        await ElementHelper.typeValue(await InstaFollowersPage.prototype.login_name, login_name)
        await ElementHelper.typeValue(await InstaFollowersPage.prototype.password, password)

        await ElementHelper.click(await InstaFollowersPage.prototype.login_btn);
        await ElementHelper.waitForDisplayed(await InstaFollowersPage.prototype.search_btn);
    }

    static async search_on_account_name(account_name) {
        // open search bar
        // search for the tag/username/keywords
        // open the first search result

        await ElementHelper.click(await InstaFollowersPage.prototype.search_btn);
        await ElementHelper.typeValue(await InstaFollowersPage.prototype.search_input_field, account_name)
        await browser.pause(3000);
        await ElementHelper.click(await InstaFollowersPage.prototype.first_searched_account_name);
        await ElementHelper.waitForDisplayed(await InstaFollowersPage.prototype.searched_post);
    }

    static async open_last_post() {
        await ElementHelper.click(await InstaFollowersPage.prototype.searched_post);
        await ElementHelper.waitForDisplayed(await InstaFollowersPage.prototype.profile_page_likes);
    }

    static async check_post_date() {
        // check the date of the post
        // better target the posts which created no later than 10 days ago

        // TODO
    }

    static async open_likes_modal(page) {
        // click on the 'Likes' in order to open the list of users who liked that post

        if (page == 'home_page') {
            await ElementHelper.click(await InstaFollowersPage.prototype.home_page_likes);
        }
        else if (page == 'profile_page') {
            await ElementHelper.click(await InstaFollowersPage.prototype.profile_page_likes);
        }

        await ElementHelper.waitForDisplayed(await InstaFollowersPage.prototype.likes_modal_non_follower_name);
    }

    static async open_likes_page() {
        const postID = (await browser.getUrl()).match(/\/p\/([^/]+)/)[1];
        const likedURL = `https://www.instagram.com/p/${postID}/liked_by`;
        await browser.newWindow(likedURL);

        await browser.pause(3000);
        await browser.switchWindow(likedURL)
        await ElementHelper.waitForDisplayed(await InstaFollowersPage.prototype.liked_by_non_follower_name);
        await browser.pause(5000);
    }

    static async open_profile_page_in_new_tab(potential_user) {
        const profileURL = `https://www.instagram.com/${potential_user}`;
        await browser.newWindow(profileURL);

        await browser.pause(3000);
        await browser.switchWindow(profileURL)
        await ElementHelper.waitForDisplayed(await InstaFollowersPage.prototype.profile_page_number_of_posts);
        await browser.pause(5000);
    }

    static async close_profile_page_tab(liked_by_url) {
        await browser.closeWindow();
        await browser.pause(3000);
        await browser.switchWindow(liked_by_url)
        await ElementHelper.waitForDisplayed(await InstaFollowersPage.prototype.liked_by_non_follower_name);
        await browser.pause(5000);
    }

    static async save_account_data() {
        const originalURL = await browser.getUrl();
        const accountData = [];
        // Get all elements matching the XPath
        const elements = await $$(`//*[normalize-space(@dir) = "auto" and normalize-space() = "Follow"]/ancestor::div[5]//div[2]/div[1]/div/div`);
        const limitedElements = elements.slice(0, 50);

        // Iterate over each element
        for (const element of limitedElements) {
            let potential_user = await element.getText();
            await this.open_profile_page_in_new_tab(potential_user)

            // Check if the private account text is displayed
            if (await (await InstaFollowersPage.prototype.private_account_text).isDisplayed()) {
                //  we do not need it, just check the other accounts
            } else {
                let number_of_posts = await this.save_text(await InstaFollowersPage.prototype.profile_page_number_of_posts);
                let number_of_followers = await this.save_text(await InstaFollowersPage.prototype.profile_page_number_of_followers);
                let number_of_following = await this.save_text(await InstaFollowersPage.prototype.profile_page_number_of_following);

                // Push the extracted data to the array
                // @ts-ignore
                accountData.push({
                    number_of_posts,
                    number_of_followers,
                    number_of_following,
                    potential_user
                });
            }

            await this.close_profile_page_tab(originalURL)
        }

        return accountData;
    }

    static async save_text(selector) {
        try {
            await ElementHelper.waitForDisplayed(selector);
        }
        catch {
            await browser.refresh();
            await ElementHelper.waitForDisplayed(await InstaFollowersPage.prototype.instagram_logo);
            await browser.pause(5000);
        }

        let max_value = (selector).getText();
        return max_value;
    }

    static async list_of_target_names(accountData: any[]) {
        // Filter the account data based on the specified conditions
        const filteredData = await Promise.all(accountData.map(async (data) => {
            // Preprocess the numbers to handle different formats
            const numPosts = await this.preprocess_number(data.number_of_posts);
            const numFollowers = await this.preprocess_number(data.number_of_followers);
            const numFollowing = await this.preprocess_number(data.number_of_following);

            console.log('Number of posts:', numPosts);
            console.log('Number of followers:', numFollowers);
            console.log('Number of following:', numFollowing);

            const meetsConditions =
                numPosts >= 15 &&
                numFollowers > 200 && numFollowers < 800 &&
                numFollowing > 400;

            console.log('User name:', data.potential_user);
            console.log('Meets conditions:', meetsConditions);

            return meetsConditions ? data.potential_user : null;
        }));

        // Extract and log the names from the filtered data
        console.log('List of target users:');
        filteredData.forEach(userName => {
            if (userName) {
                console.log(userName);
            }
        });

        // Return the list of target users
        return filteredData.filter(userName => userName !== null);
    }

    static async preprocess_number(numStr: string): number {
        // Remove commas
        const cleanedNumStr = numStr.replace(/,/g, '');

        // Convert "K" notation to numeric values
        const num = cleanedNumStr.endsWith('K') ?
            parseFloat(cleanedNumStr) * 1000 :
            parseInt(cleanedNumStr, 10);

        // Return the parsed number or NaN if the string cannot be parsed
        return isNaN(num) ? 0 : num;
    }

    static async write_to_google_sheet(file, names) {
        await browser.url(file);
        await ElementHelper.waitForDisplayed(await InstaFollowersPage.prototype.file_with_names);

        const old_list_of_names = await (await InstaFollowersPage.prototype.file_with_names).getText();

        for (const name of names) {
            if (!old_list_of_names.includes(name)) {
                await (await InstaFollowersPage.prototype.file_with_names).addValue(name)
                await browser.keys('Enter');
            }
            await browser.pause(1000);
        }
    }
}
