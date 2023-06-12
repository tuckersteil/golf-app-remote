class CoursesController < ApplicationController
    def create 
        course = Course.create!(course_params)
        render json: course, status: :created 
    rescue ActiveRecord::RecordInvalid => invalid
        render json: { errors: [invalid.record.errors] }, status: :unprocessable_entity
    end 

    def index 
        courses = Course.all
        render json: courses 
    end 

    def destroy
        course = find_course
        course.destroy
        head :no_content
    end 

    def show 
        course = Course.find_by(id: params[:id])
        render json: course 
    end 


    def wordy
        courses = Course.all
        final = []
        courses.each do |course|
            if course.description.include?(params[:word])
                final << course
            end
        end
       if (final.length >= 1)
            render json: final
       else 
            render json: { errors: ["no courses found"]}

       end
    end 
    
    # Write a custom route that takes in a parameter of a word and looks at all 
    # the courses and their descriptions and finds any courses that have that 
    # word in the description.  Return all the courses that meet this condition.
    #  If no courses meet the condition then you should render json
    #  that says: no courses found under a key of error.

    private 

    def course_params 
        params.permit(:name, :location, :par, :holes, :length, :description, :img)
    end 

    def find_course
        Course.find(params[:id])
    end 


end
