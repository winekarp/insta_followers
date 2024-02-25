
export class InstaFollowersPage {

    // Login
    get instagram_logo() {
        return $(`[aria-label="Instagram"]`);
    }

    get instagram_home_page() {
        return $(`//body`);
    }

    get allow_cookies_btn() {
        return $(`//*[text()="Allow all cookies"]`);
    }

    get login_name() {
        return $(`[name="username"]`);
    }

    get password() {
        return $(`[name="password"]`);
    }

    get login_btn() {
        return $(`[type="submit"]`);
    }

    // Searching
    get search_btn() {
        return $(`//span/span[text()="Search"]`);
    }

    get search_input_field() {
        return $(`[aria-label="Search input"]`);
    }

    get first_searched_account_name() {
        return $(`(//*[@aria-label="Search input"]/ancestor::div[4]/div[3]//a/div)[1]`);
    }

    get searched_post() {
        return $(`(//main/article//a)[1]`);
    }

    // Profile page
    get profile_page_last_post_btn() {
        return $(`(//main/div/div[3]/div/div/div/a)[1]`);
    }

    get profile_page_likes() {
        return $(`//article//section[2]//a`);
    }

    get profile_page_number_of_posts() {
        return $(`//section/ul/li[1]//span/span`);
    }

    get profile_page_number_of_followers() {
        return $(`//section/ul/li[2]//span/span`);
    }

    get profile_page_number_of_following() {
        return $(`//section/ul/li[3]//span/span`);
    }

    // Home page
    get home_page_likes() {
        return $(`//article//section//a[contains(@href, 'liked_by')]/span[contains(text(), 'likes') or contains(text(), 'others')]`);
    }

    get likes_modal_non_follower_name() {
        return $(`(//*[text()="Likes"]/ancestor::div[4]//*[normalize-space(@dir) = "auto" and normalize-space() = "Follow"]/ancestor::div[5]//div[2]/div[1]/div/div)[1]`);
    }

    get likes_modal_non_follower_names() {
        return $(`//*[text()="Likes"]/ancestor::div[4]//*[normalize-space(@dir) = "auto" and normalize-space() = "Follow"]/ancestor::div[5]//div[2]/div[1]/div/div`);
    }

    get profile_popup_number_of_posts() {
        return $(`//*[normalize-space(@dir) = "auto" and normalize-space() = "posts"]/ancestor::div[3]/div[1]/div[1]/span/span`);
    }

    get profile_popup_number_of_followers() {
        return $(`//*[normalize-space(@dir) = "auto" and normalize-space() = "posts"]/ancestor::div[3]/div[2]/div[1]/span/span`);
    }

    get profile_popup_number_of_following() {
        return $(`//*[normalize-space(@dir) = "auto" and normalize-space() = "posts"]/ancestor::div[3]/div[3]/div[1]/span/span`);
    }

    get private_account_text() {
        return $(`//*[contains(text(), "The account is private") or contains(text(), "This Account is Private")]`);
    }

    get likes_modal() {
        return $(`//div[text()="Likes"]`);
    }

    // Liked_by Page
    get liked_by_non_follower_name() {
        return $(`(//*[normalize-space(@dir) = "auto" and normalize-space() = "Follow"]/ancestor::div[5]//div[2]/div[1]/div/div)[1]`);
    }




    get file_with_names() {
        return $(`#textarea__editor`);
    }
}