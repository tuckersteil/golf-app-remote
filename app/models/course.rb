class Course < ApplicationRecord
    has_many :teetimes
    has_many :users, through: :teetimes
end
