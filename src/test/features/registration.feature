Feature: Register new user feature

@register
Scenario: Register new user
    Given User navigate to registartion
    When User register with all details
    Then User should be able to see success message