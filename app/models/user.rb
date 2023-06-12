class User < ApplicationRecord
    has_secure_password 
    has_many :teetimes
    has_many :courses, through: :teetimes
    validates :username, presence: true
    validates :username, uniqueness: true
end
