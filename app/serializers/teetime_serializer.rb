class TeetimeSerializer < ActiveModel::Serializer
  attributes :id, :time, :date, :players, :price, :holes, :course_id, :user_id, :course, :status
end
