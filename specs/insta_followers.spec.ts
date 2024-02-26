import { InstaFollowersControl } from './insta_followers.control';
import { azureParams } from '../configs/azure_params';

// let user_name = azureParams.user_name;
// let user_password = azureParams.user_password;
// let file_with_names = azureParams.file_with_names;
let user_name = `blokha_baba123`
let user_password = `blokha_babablokha_baba`
let file_with_names = `https://www.editpad.org/?edit-id=qs9nfQUNbidfc7e22e`

describe('List of insta followers', () => {
    beforeEach(async () => {
        await browser.maximizeWindow();
    });

    it(`Test: Write list of accs to follow 1
        Precondition: Load list of common followers-following into the 'friends' list

            - Login
            - Check each friend from list who posted on the last 10 days
                - Click on Search button
                - Search and Open the Profile
                - Open the last Post
                - Check the date. 
            - If posted on the last 10 day then open the post's likes 
            - Hover to each non-followed account's profile
            - Check the number of Posts, Followers, Following
            
        Result: Save user's name if:
            - Posts number is >= 20
            - Followers number is > 200 < 800
            - Following number is > 500

        `, async function () {

        let friends = `
            PLACE_HOLDER
        `
        let post_index = 1

        await InstaFollowersControl.login(user_name, user_password);
        await InstaFollowersControl.search_on_account_name(account_name);
        await InstaFollowersControl.open_last_post();
        // await InstaFollowersControl.check_post_date();

        await InstaFollowersControl.open_likes_modal('profile_page');
        let account_data = await InstaFollowersControl.save_account_data()
    });

    it(`Test: Write list of accs to follow 2 - From #tags
    Precondition: Load list of common followers-following into the 'friends' list

        - Login
        - Check users who liked your target tags:
            - Click on Search button
            - Search and Open the tag
            - Open the last Post
            - Open its likes 
        - Hover to each non-followed account's profile
        - Check the number of Posts, Followers, Following
        
    Result: Save user's name if:
        - Posts number is >= 15
        - Followers number is > 200 < 800
        - Following number is > 400

    `, async function () {

        let target_tag = 'winetravel'

        await InstaFollowersControl.login(user_name, user_password);
        await InstaFollowersControl.search_on_account_name(`#${target_tag}`);
        await InstaFollowersControl.open_last_post();

        await InstaFollowersControl.open_likes_page();

        let account_data = await InstaFollowersControl.save_account_data()
        let target_users = await InstaFollowersControl.list_of_target_names(account_data)

        await InstaFollowersControl.write_to_google_sheet(file_with_names, target_users)
    });

    fit(`Test: Write list of accs to follow 2 - From #tags
    Precondition: Load list of common followers-following into the 'friends' list

        - Login
        - Check users who liked your target tags:
            - Click on Search button
            - Search and Open the tag
            - Open the last Post
            - Open its likes 
        - Hover to each non-followed account's profile
        - Check the number of Posts, Followers, Following
        
    Result: Save user's name if:
        - Posts number is >= 15
        - Followers number is > 200 < 800
        - Following number is > 400

    `, async function () {

        let target_tag = 'winemaking'

        await InstaFollowersControl.login(user_name, user_password);
        await InstaFollowersControl.search_on_account_name(`#${target_tag}`);
        await InstaFollowersControl.open_last_post();

        await InstaFollowersControl.open_likes_page();

        let account_data = await InstaFollowersControl.save_account_data()
        let target_users = await InstaFollowersControl.list_of_target_names(account_data)

        await InstaFollowersControl.write_to_google_sheet(file_with_names, target_users)
    });
});
