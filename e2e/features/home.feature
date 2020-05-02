Feature: URL validation
    As a user, I want to validate the url

    Scenario: user checks the url is secure
        Given user navigate to the target login page
        And user enter "tomsmith" and "SuperSecretPassword!"
        When user click the login button
        Then user validates the url is secure